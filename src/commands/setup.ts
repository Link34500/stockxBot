import { prisma } from "@/config";
import Command from "@/config/Command";
import CreateAccountModal from "@/ui/create-account";
import { ChatInputCommandInteraction } from "discord.js";

export default class Setup extends Command {
  name = "setup";
  description = "Command for setup your user";
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const emailModal = new CreateAccountModal();
    const user = await prisma.user.findUnique({
      where: { discordId: interaction.user.id },
    });
    if (user) {
      await interaction.reply("Vous avez déjà un compte");
      return;
    }
    interaction.showModal(await emailModal.build());
  }
}
