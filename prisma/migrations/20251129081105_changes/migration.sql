/*
  Warnings:

  - You are about to drop the column `template` on the `Marque` table. All the data in the column will be lost.
  - Added the required column `templateUrl` to the `Marque` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Marque" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "templateUrl" TEXT NOT NULL
);
INSERT INTO "new_Marque" ("id", "name") SELECT "id", "name" FROM "Marque";
DROP TABLE "Marque";
ALTER TABLE "new_Marque" RENAME TO "Marque";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
