import { prisma } from "@/config";
import Modal, { Field } from "@/config/Modal";
import { ModalSubmitInteraction } from "discord.js";

export default class ArticleModal extends Modal {
  id = "article";
  title = "Ajouter un article";
  fields = this.getFields();
  async callback(interaction: ModalSubmitInteraction): Promise<void> {
    await interaction.reply(
      `C'est bon ${interaction.fields.getTextInputValue("email")}`
    );
  }
  async getFields() {
    return await prisma.articleQuestion.findMany();
  }
}
