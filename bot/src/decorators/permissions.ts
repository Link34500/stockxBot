import { createAccountButton } from "@/buttons";
import { prisma } from "@stockxbot/common/prisma/client";
import { createEmbed } from "@/utils/translate";
import { Interaction } from "discord.js";

export function RequireUser() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = async function (
      interaction: Interaction,
      ...args: any[]
    ) {
      const existing = await prisma.user.findUnique({
        where: { discordId: interaction.user.id },
      });

      if (!existing) {
        const embed = await createEmbed(interaction, "errors.not-account");
        if (interaction.isRepliable())
          await interaction.reply({
            embeds: [embed],
            components: [createAccountButton(interaction)],
            ephemeral: true,
          });
        return;
      }

      return original.apply(this, [interaction, ...args]);
    };

    return descriptor;
  };
}
