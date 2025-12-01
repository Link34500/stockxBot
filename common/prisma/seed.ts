import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "../db.sqlite3");

const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

const questionsBillingInfo = [
  { text: "Prénom :", forKey: "BILLING.NAME" },
  { text: "Nom :", forKey: "BILLING.LASTNAME" },
  { text: "Adresse :", forKey: "BILLING.ADDRESS" },
  { text: "Adresse 2 (optionnel) :", forKey: "BILLING.ADDRESS2" },
  { text: "Ville :", forKey: "BILLING.CITY" },
  { text: "Code postal :", forKey: "BILLING.ZIP" },
  { text: "Pays :", forKey: "BILLING.COUNTRY" },
  { text: "Numéro de téléphone :", forKey: "BILLING.PHONE" },
  { text: "Adresse e-mail :", forKey: "BILLING.EMAIL" },
];

const articleInfo = [
  { text: "Nom de l'article :", forKey: "ARTICLE.NAME", placeholder: "ex: Nike Air Force 1" },
  { text: "Description :", forKey: "ARTICLE.DESCRIPTION", placeholder: "Décrivez l'article" },
  { text: "Couleur :", forKey: "ARTICLE.COLOR", placeholder: "ex: Noir" },
  { text: "Taille :", forKey: "ARTICLE.SIZE", placeholder: "ex: 42" },
  { text: "Marque :", forKey: "ARTICLE.BRAND", placeholder: "ex: Nike" },
  { text: "Prix :", forKey: "ARTICLE.PRICE", placeholder: "ex: 100€" },
  { text: "Lien de l'image :", forKey: "ARTICLE.IMAGE_URL", placeholder: "https://example.com/image.jpg" },
  { text: "Code de produit :", forKey: "ARTICLE.SKU", placeholder: "ex: SKU123" },
  { text: "Catégorie :", forKey: "ARTICLE.CATEGORY", placeholder: "ex: Chaussures" },
  { text: "Stock disponible :", forKey: "ARTICLE.STOCK", placeholder: "ex: 10" },
];

const marques = [
  { name: "adidas", templateUrl: "adidas.html" },
  { name: "apple", templateUrl: "apple.html" },
  { name: "arcteryx", templateUrl: "arcteryx.html" },
  { name: "avis farfetch", templateUrl: "avis farfetch.html" },
  { name: "bape", templateUrl: "bape.html" },
  { name: "burberry", templateUrl: "burberry.html" },
  { name: "crtz", templateUrl: "crtz.html" },
  { name: "dior", templateUrl: "dior.html" },
  { name: "dyson", templateUrl: "dyson.html" },
  { name: "jacquemus", templateUrl: "jacquemus.html" },
  { name: "lv", templateUrl: "lv.html" },
  { name: "moncler", templateUrl: "moncler.html" },
  { name: "nike", templateUrl: "nike.html" },
  { name: "oakley", templateUrl: "oakley.html" },
  { name: "prada", templateUrl: "prada.html" },
  { name: "snkrs", templateUrl: "snkrs.html" },
  { name: "stockx", templateUrl: "stockx 2.html" },
  { name: "supreme", templateUrl: "supreme.html" },
  { name: "trapstar", templateUrl: "trapstar.html" },
  { name: "zadig", templateUrl: "zadig.html" },
  { name: "zalando", templateUrl: "zalando.html" },
];

async function main() {
  console.log("🌱 Seeding marques...");

  // Ensure marques, billing questions and article questions exist (no duplicates)
  await Promise.all(
    marques.map(async (m) => {
      const exists = await prisma.marque.findFirst({
        where: { name: m.name },
      });
      if (!exists) {
        await prisma.marque.create({ data: m });
      }
    })
  );

  await Promise.all(
    questionsBillingInfo.map(async (q) => {
      const exists = await prisma.billingInfoQuestion.findFirst({
        where: { forKey: q.forKey },
      });
      if (!exists) {
        await prisma.billingInfoQuestion.create({
          data: { text: q.text, forKey: q.forKey },
        });
      }
    })
  );

  await Promise.all(
    articleInfo.map(async (a) => {
      const exists = await prisma.articleQuestion.findFirst({
        where: { forKey: a.forKey },
      });
      if (!exists) {
        await prisma.articleQuestion.create({
          data: { text: a.text, forKey: a.forKey, placeholder: a.placeholder },
        });
      }
    })
  );

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
