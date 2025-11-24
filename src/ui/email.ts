import Modal, { Field } from "@/config/Modal";
import { ModalSubmitInteraction } from "discord.js";

export default class EmailModal extends Modal {
  id = "email";
  title = "Envoie d'email";
  fields = [new Field("email", "Email d'envoie de la demande", "Email...")];
  async callback(interaction: ModalSubmitInteraction): Promise<void> {
    await interaction.reply(
      `C'est bon ${interaction.fields.getTextInputValue("email")}`
    );
  }
}
