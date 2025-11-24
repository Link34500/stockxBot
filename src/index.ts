import { Bot } from "./config/Bot.js";

globalThis.__dirname = import.meta.dirname;

export const bot = new Bot();

bot.run();
