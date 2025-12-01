import Event from "@/config/Event";
import { Interaction, CacheType } from "discord.js";
import { bot } from "@/index";

export default class InteractionCreate extends Event<"interactionCreate"> {
  name = "interactionCreate" as const;
  async execute(interaction: Interaction<CacheType>): Promise<void> {
    if (interaction.isChatInputCommand()) {
      await bot.loader.onCommand(interaction);
    }
    if (interaction.isModalSubmit()) {
      await bot.loader.onModalSubmit(interaction);
    }
    if (interaction.isButton()) {
      const button = bot.buttons.get(interaction.customId);
      await button?.handler(interaction);
    }
    if (interaction.isStringSelectMenu()) {
      const selectMenu = bot.selectMenus.get(interaction.customId);
      await selectMenu?.handler(interaction);
    }
  }
}
