import { prisma } from "./config.js";
import { Bot } from "./config/Bot.js";

globalThis.__dirname = import.meta.dirname;

async function main() {
  const question = await prisma.articleQuestion.create({
    data: {
      text: "Quel est le nom de l'article ?",
      forKey: "article_name",
      placeholder: "Entrez le nom ici",
    },
  });

  console.log("Question créée :", question);
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());

export const bot = new Bot();

bot.run();
