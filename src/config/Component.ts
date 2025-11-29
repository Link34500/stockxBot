import { UserGetPayload } from "@/generated/prisma/models";
import { createEmbed } from "@/utils/translate";
import { ActionRowBuilder, AnyComponentBuilder, Interaction } from "discord.js";

export interface DefaultComponentProps<InteractionType extends Interaction> {
  userId?: string;
  callback: (interaction: InteractionType) => Promise<void>;
  onError?: (interaction: InteractionType, userId?: string) => Promise<void>;
}

export default class Component<
    InteractionType extends Interaction,
    T extends AnyComponentBuilder
  >
  extends ActionRowBuilder<T>
  implements DefaultComponentProps<InteractionType>
{
  customId = crypto.randomUUID();
  userId?: string;
  callback: (interaction: InteractionType) => Promise<void>;
  onError?:
    | ((interaction: InteractionType, userId?: string) => Promise<void>)
    | undefined;
  componentsMap: Map<string, T>;
  constructor(
    { callback, onError, userId }: DefaultComponentProps<InteractionType>,
    componentsMap: Map<string, any>
  ) {
    super();
    this.callback = callback;
    this.onError = onError;
    this.userId = userId;
    this.componentsMap = componentsMap;
  }

  async handler(interaction: InteractionType) {
    const userId = this.userId ?? interaction.user.id;
    if (interaction.user.id === userId || userId === undefined) {
      await this.callback(interaction);
    } else {
      if (this.onError) {
        await this.onError(interaction, this.userId);
      } else {
        if (interaction.isRepliable())
          await interaction.reply({
            embeds: [
              await createEmbed(interaction, "errors.not-your-interaction"),
            ],
            ephemeral: true,
          });
      }
    }
    this.componentsMap.delete(this.customId);
  }
}
