import Command from "@/config/Command";
import EmailModal from "@/ui/email";
import { ChatInputCommandInteraction } from "discord.js";

export default class Setup extends Command {
  name = "setup";
  description = "Command for setup your user";
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const emailModal = new EmailModal().build();
    await interaction.showModal(emailModal);
  }
}
