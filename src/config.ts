import { GatewayIntentBits, Partials } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const config = {
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
};

export default config;
