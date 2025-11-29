import {
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  Interaction,
} from "discord.js";
import { bot } from "@/index";
import Component, { DefaultComponentProps } from "@/config/Component";
import { cacheOrders } from "@/config";
import { createEmbed } from "@/utils/translate";

interface ButtonProps {
  interaction: Interaction;
  label: string;
  style?: ButtonStyle;
}

export default class Button extends Component<
  ButtonInteraction,
  ButtonBuilder
> {
  timeout: NodeJS.Timeout | null = null; // Add timeout property

  constructor({
    label,
    style = ButtonStyle.Primary,
    interaction,
    callback,
    onError,
  }: ButtonProps & DefaultComponentProps<ButtonInteraction>) {
    super({ callback, onError, userId: interaction.user.id }, bot.buttons);

    const button = new ButtonBuilder()
      .setCustomId(this.customId)
      .setLabel(label)
      .setStyle(style);
    this.addComponents(button);
    bot.buttons.set(this.customId, this);

    // Set timeout
    this.timeout = setTimeout(() => {
      if (interaction.user.id) {
        cacheOrders.delete(interaction.user.id);
        this.removeButton(); // Remove the button from the bot's button map
        this.timedOutMessage(interaction); // Send a timeout message
      }
    }, 30000); // 30 seconds
  }

  removeButton() {
    bot.buttons.delete(this.customId);
  }

  async timedOutMessage(interaction: Interaction) {
    if (interaction.isRepliable())
      interaction.followUp({
        embeds: [await createEmbed(interaction, "generics.order-timed-out")],
      });
  }
}
