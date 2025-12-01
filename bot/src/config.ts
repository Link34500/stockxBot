import { GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
import { Prisma } from "@stockxbot/common/generated/prisma";
import path from "path";

type Order = Prisma.OrderGetPayload<{}>;
// Prisma DB

dotenv.config({
  path: path.resolve(import.meta.dirname, "..", "..", ".env.local"),
});

export const cacheOrders = new Map<string, Order>();

const config = {
  defaultColor: "#000000",
  token: process.env.DISCORD_TOKEN!,
  client_id: "1441239110680445108",
  guild: "1441239694724698225",
  intents: [
    GatewayIntentBits.Guilds, // Accès aux guildes
    GatewayIntentBits.GuildMessages, // Messages envoyés en guild
    GatewayIntentBits.DirectMessages, // Messages privés
    GatewayIntentBits.MessageContent, // Contenu des messages (obligatoire pour lire le texte)
    GatewayIntentBits.GuildMembers, // Accès aux membres (Privileged)
    GatewayIntentBits.GuildPresences, // Présences en ligne (Privileged)
    GatewayIntentBits.GuildMessageReactions, // Réactions aux messages
    GatewayIntentBits.GuildEmojisAndStickers, // Emojis et stickers
  ],
  partials: [
    Partials.Channel, // Nécessaire pour DMs
    Partials.Message,
    Partials.Reaction,
  ],
} as const;

export default config;
