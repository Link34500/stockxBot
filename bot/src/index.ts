import { Bot } from "./config/Bot.js";
import { prisma } from "@stockxbot/common/prisma/client";

prisma.$connect();
globalThis.__dirname = import.meta.dirname;

export const bot = new Bot();

bot.run();
