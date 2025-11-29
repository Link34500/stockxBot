import { prisma } from "@/config";
import Modal, { Field } from "@/components/Modal";
import { ModalSubmitInteraction } from "discord.js";
import { createEmbed } from "@/utils/translate";
import { createOrderButton } from "@/buttons";

export default class CreateAccountModal extends Modal {
  id = "create-account";
  title = "Enregistrer vous";
  fields = [new Field("email", "Entrez votre email", "Email...")];

  async callback(interaction: ModalSubmitInteraction): Promise<void> {
    const emailUser = interaction.fields.getTextInputValue("email");
    // Caching Order
    const user = await prisma.user.create({
      data: { discordId: interaction.user.id, email: emailUser },
    });

    // Rendering
    const embed = await createEmbed(interaction, "ui.create-account.sucess");

    await interaction.reply({
      embeds: [embed],
      components: [createOrderButton(interaction)],
    });
  }
}
