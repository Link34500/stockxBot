import { cacheOrders } from "@/config";
import { prisma } from "@stockxbot/common/prisma/client";
import { createEmbed } from "@/utils/translate";
import {
  ActionRowBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export class Field extends TextInputBuilder {
  constructor(
    public forKey: string,
    public text: string,
    public placeholder: string = "",
    public style: TextInputStyle = TextInputStyle.Short
  ) {
    super();
    this.setCustomId(forKey)
      .setStyle(style)
      .setPlaceholder(placeholder)
      .setLabel(text)
      .setRequired(false);
  }
}

export interface FieldResult {
  name: string;
  value: string;
}

export default abstract class Modal extends ModalBuilder {
  abstract id: string | Promise<string> | (() => Promise<string>);
  abstract title: string | Promise<string> | (() => Promise<string>);
  abstract fields: Field[] | Promise<Field[]> | (() => Promise<Field[]>);

  constructor() {
    super();
  }

  private async resolveValue<T>(
    value: T | Promise<T> | (() => Promise<T>)
  ): Promise<T> {
    if (typeof value === "function" && value instanceof Function) {
      return await (value as () => Promise<T>)();
    }
    return await Promise.resolve(value);
  }

  async build() {
    const id = await this.resolveValue(this.id);
    const title = await this.resolveValue(this.title);
    const fields = await this.resolveValue(this.fields);

    this.setCustomId(id as string);
    this.setTitle(title as string);

    this.setComponents(
      (fields as Field[]).map((field) =>
        new ActionRowBuilder<TextInputBuilder>().addComponents(field)
      )
    );
    return this;
  }

  async callback(
    interaction: ModalSubmitInteraction
  ): Promise<FieldResult[] | void> {
    const user = await prisma.user.findUnique({
      where: { discordId: interaction.user.id },
    });
    const currentOrder = cacheOrders.get(user!.discordId);
    const fieldsResults: FieldResult[] = [];
    if (!currentOrder) {
      await interaction.reply({
        embeds: [await createEmbed(interaction, "errors.not-order-found")],
      });
      return;
    }
    for (const [key, value] of interaction.fields.fields) {
      // @ts-ignore
      const stringValue = value.value;
      await prisma.answer.create({
        data: {
          key,
          value: stringValue,
          order: { connect: { id: currentOrder.id } },
        },
      });
      fieldsResults.push({ name: key, value: stringValue });
    }
    return fieldsResults;
  }
}
