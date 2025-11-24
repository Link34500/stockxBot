-- CreateTable
CREATE TABLE "User" (
    "discordId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Template" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Marque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,
    CONSTRAINT "Marque_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    CONSTRAINT "Answer_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ArticleQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "forKey" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BillingInfoQuestion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "forKey" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "emailAdressee" TEXT,
    "userId" INTEGER NOT NULL,
    "marqueId" INTEGER NOT NULL,
    CONSTRAINT "Order_marqueId_fkey" FOREIGN KEY ("marqueId") REFERENCES "Marque" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("discordId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Answer_key_key" ON "Answer"("key");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleQuestion_forKey_key" ON "ArticleQuestion"("forKey");

-- CreateIndex
CREATE UNIQUE INDEX "BillingInfoQuestion_forKey_key" ON "BillingInfoQuestion"("forKey");
