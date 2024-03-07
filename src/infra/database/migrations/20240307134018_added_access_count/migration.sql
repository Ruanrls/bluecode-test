-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShortenedUrl" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalUrl" TEXT NOT NULL,
    "shortenedUrl" TEXT NOT NULL,
    "accessCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ShortenedUrl" ("createdAt", "id", "originalUrl", "shortenedUrl", "updatedAt") SELECT "createdAt", "id", "originalUrl", "shortenedUrl", "updatedAt" FROM "ShortenedUrl";
DROP TABLE "ShortenedUrl";
ALTER TABLE "new_ShortenedUrl" RENAME TO "ShortenedUrl";
CREATE UNIQUE INDEX "ShortenedUrl_originalUrl_key" ON "ShortenedUrl"("originalUrl");
CREATE UNIQUE INDEX "ShortenedUrl_shortenedUrl_key" ON "ShortenedUrl"("shortenedUrl");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
