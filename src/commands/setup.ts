import Command from "@/config/Command";
import ArticleModal from "@/ui/article";
import { ChatInputCommandInteraction } from "discord.js";

export default class Setup extends Command {
  name = "setup";
  description = "Command for setup your user";
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const articleModal = new ArticleModal();
    await interaction.showModal(await articleModal.build());
  }
}
