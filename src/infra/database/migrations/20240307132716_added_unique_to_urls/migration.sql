/*
  Warnings:

  - A unique constraint covering the columns `[originalUrl]` on the table `ShortenedUrl` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shortenedUrl]` on the table `ShortenedUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_originalUrl_key" ON "ShortenedUrl"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_shortenedUrl_key" ON "ShortenedUrl"("shortenedUrl");
