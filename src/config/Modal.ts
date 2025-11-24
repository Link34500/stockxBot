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
      .setLabel(text);
  }
}

export default abstract class Modal extends ModalBuilder {
  abstract id: string | Promise<string>;
  abstract title: string | Promise<string>;
  abstract fields: Field[] | Promise<Field[]>;

  constructor() {
    super();
  }

  async build() {
    const id = await this.id;
    const title = await this.title;
    const fields = await this.fields;
    this.setCustomId(id);
    this.setTitle(title);

    this.setComponents(
      fields.map((field) =>
        new ActionRowBuilder<TextInputBuilder>().addComponents(field)
      )
    );
    return this;
  }

  abstract callback(interaction: ModalSubmitInteraction): Promise<void>;
}
