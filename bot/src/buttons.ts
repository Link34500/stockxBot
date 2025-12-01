import Button from "@/components/Button";
import { createEmbed } from "@/utils/translate";
import CreateAccountModal from "@/ui/create-account";
import BillingModal from "./ui/billing-info";
import { prisma } from "@stockxbot/common/prisma/client";
import { ButtonStyle, Interaction } from "discord.js";
import ArticleModal from "./ui/article";

export const createOrderButton = (interaction: Interaction) =>
  new Button({
    interaction,
    label: "Crée une commande",
    style: ButtonStyle.Success,
    userId: interaction.user.id,
    async callback(interaction) {
      interaction.reply({
        embeds: [
          await createEmbed(interaction, "commands.generate.ask-marque"),
        ],
      });
    },
  });

export const createAccountButton = (interaction: Interaction) =>
  new Button({
    interaction,
    label: "Créer un compte",
    userId: interaction.user.id,
    async callback(interaction) {
      const modal = new CreateAccountModal();
      await interaction.showModal(await modal.build());
    },
  });

export const billingInfoButton = (interaction: Interaction) =>
  new Button({
    interaction,
    label: "Ajouter les informations de facturation",
    style: ButtonStyle.Secondary,
    userId: interaction.user.id,
    async callback(interaction) {
      const modal = new BillingModal();
      await interaction.showModal(await modal.build());
    },
  });

export const billingDefaultInfoButton = (interaction: Interaction) =>
  new Button({
    interaction,
    label: "Laissez les informations par défaut",
    style: ButtonStyle.Secondary,
    userId: interaction.user.id,
    async callback(interaction) {
      const user = await prisma.user.findUnique({
        where: { discordId: interaction.user.id },
      })!;
      user?.email;
      await interaction.reply(
        "En cours de dev il faut rajouter les questions dynamique d'abords"
      );
    },
  });

export const addArticleButton = (interaction: Interaction) =>
  new Button({
    interaction,
    label: "Ajouter un article",
    style: ButtonStyle.Success,

    userId: interaction.user.id,
    async callback(interaction) {
      const modal = new ArticleModal();
      interaction.showModal(await modal.build());
    },
  });

export const finalizeOrderButton = (interaction: Interaction) =>
  new Button({
    interaction,
    label: "Finalizer la commande",
    style: ButtonStyle.Danger,
    userId: interaction.user.id,
    async callback(interaction) {
      await interaction.reply({
        embeds: [await createEmbed(interaction, "generics.confirm-order")],
        components: [sendToMailOrderButton(interaction)],
      });
    },
  });

export const sendToMailOrderButton = (interaction: Interaction) =>
  new Button({
    interaction,
    label: "Envoyer par email",
    style: ButtonStyle.Success,
    userId: interaction.user.id,
    async callback(interaction) {
      // Logique de l'envoie de mail
      await interaction.reply({
        embeds: [await createEmbed(interaction, "generics.sucess-mail-send")],
      });
    },
  });
