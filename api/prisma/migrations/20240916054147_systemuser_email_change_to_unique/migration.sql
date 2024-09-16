/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `systemusers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "systemusers_email_key" ON "systemusers"("email");
