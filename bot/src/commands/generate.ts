import SelectMenu from "@/components/SelectMenu";
import Command from "@/config/Command";
import { RequireUser } from "@/decorators/permissions";
import { createEmbed, translate } from "@/utils/translate";
import { ChatInputCommandInteraction, TextChannel } from "discord.js";
import { cacheOrders } from "@/config";
import { prisma } from "@stockxbot/common/prisma/client";
import BillingModal from "@/ui/billing-info";
import { billingDefaultInfoButton, billingInfoButton } from "@/buttons";

export default class GenerateCommand extends Command {
  name = "generate";
  description = "Crée une nouvelle commande";

  @RequireUser()
  async execute(interaction: ChatInputCommandInteraction): Promise<void | any> {
    const user = await prisma.user.findUnique({
      where: { discordId: interaction.user.id },
    });
    await interaction.reply({
      embeds: [await createEmbed(interaction, "commands.generate.ask-marque")],
      components: [
        new SelectMenu({
          placeholder: await translate(
            interaction,
            "commands.generate.marque-select.placeholder"
          ),
          opts: await this.getOptions(),
          userId: interaction.user.id,

          async callback(interaction) {
            const marqueId = interaction.values[0];
            const marque = await prisma.marque.findUnique({
              where: { id: parseInt(marqueId) },
            });

            const order = await prisma.order.create({
              data: { marqueId: marque!.id, userId: interaction.user.id },
            });
            cacheOrders.set(interaction.user.id, order);
            await interaction.reply({
              embeds: [
                await createEmbed(
                  interaction,
                  "commands.generate.ask-billing-info"
                ),
              ],
              components: [
                billingInfoButton(interaction),
                billingDefaultInfoButton(interaction),
              ],
            });
          },
        }),
      ],
    });
  }

  async getOptions() {
    const marques = await prisma.marque.findMany();
    return marques.map((marque) => {
      return { label: marque.name, value: marque.id.toString() };
    });
  }
}
