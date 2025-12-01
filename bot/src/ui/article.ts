import { prisma } from "@stockxbot/common/prisma/client";
import Modal, { Field } from "@/components/Modal";
import { RequireUser } from "@/decorators/permissions";
import { ModalSubmitInteraction } from "discord.js";
import { createEmbed } from "@/utils/translate";
import { finalizeOrderButton } from "@/buttons";

export default class ArticleModal extends Modal {
  id = "article";
  title = "Ajouter un article";
  fields = () => this.getFields();

  @RequireUser()
  async callback(interaction: ModalSubmitInteraction): Promise<void> {
    const fields = await super.callback(interaction);
    if (!fields) return;
    const embed = await createEmbed(interaction, "ui.article.sucess-append");
    await interaction.reply({
      embeds: [embed.setFields(fields)],
      components: [finalizeOrderButton(interaction)],
    });
  }

  private async getFields() {
    const fields = await prisma.articleQuestion.findMany({ take: 5 });
    return fields.map(
      (field) => new Field(field.forKey, field.text, field.placeholder)
    );
  }
}
