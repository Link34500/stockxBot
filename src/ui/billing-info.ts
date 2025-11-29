import { prisma } from "@/config";
import Modal, { Field, FieldResult } from "@/components/Modal";
import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import { RequireUser } from "@/decorators/permissions";
import { createEmbed } from "@/utils/translate";
import { addArticleButton } from "@/buttons";

export default class BillingModal extends Modal {
  id = "billing-info";
  title = "Enregistrer vous";
  fields = this.getFields();

  @RequireUser()
  async callback(interaction: ModalSubmitInteraction): Promise<void> {
    const fields = await super.callback(interaction);
    if (!fields) return;
    const embed = await createEmbed(interaction, "ui.billing-info.sucess-send");
    await interaction.reply({
      embeds: [embed.setFields()],
      components: [addArticleButton(interaction)],
    });
  }

  async getFields() {
    const fields = await prisma.billingInfoQuestion.findMany();
    return fields.map((field) => new Field(field.forKey, field.text));
  }
}
