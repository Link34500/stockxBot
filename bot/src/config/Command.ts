import type { ChatInputCommandInteraction } from "discord.js";

import { SlashCommandBuilder } from "discord.js";

export default abstract class Command {
  abstract name: string;
  abstract description: string;
  abstract execute(
    interaction: ChatInputCommandInteraction
  ): Promise<void | any>;
  permissions?: bigint;
  autocompletes?: AutoComplete[];

  get data() {
    const commandBuilder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .setDefaultMemberPermissions(this.permissions);
    if (this.autocompletes)
      for (const autocomplete of this.autocompletes) {
        commandBuilder.addStringOption((option) =>
          option
            .setName(autocomplete.name)
            .setDescription(autocomplete.description)
            .setRequired(autocomplete.required)
            .setAutocomplete(true)
        );
      }
    return commandBuilder;
  }
}

export class AutoComplete {
  constructor(
    public name: string,
    public description: string,
    public required: boolean
  ) {}
}
