import {
  ActionRowBuilder,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export class Field extends TextInputBuilder {
  constructor(
    public id: string,
    public label: string,
    public placeholder: string = "",
    public style: TextInputStyle = TextInputStyle.Short
  ) {
    super();
    this.setCustomId(id)
      .setStyle(style)
      .setPlaceholder(placeholder)
      .setLabel(label);
  }
}

export default abstract class Modal extends ModalBuilder {
  abstract id: string;
  abstract title: string;
  abstract fields: Field[];

  constructor() {
    super();
  }

  build() {
    this.setCustomId(this.id);
    this.setTitle(this.title);
    this.setComponents(
      this.fields.map((field) => new ActionRowBuilder().addComponents(field))
    );
    return this;
  }

  abstract callback(interaction: ModalSubmitInteraction): Promise<void>;
}
