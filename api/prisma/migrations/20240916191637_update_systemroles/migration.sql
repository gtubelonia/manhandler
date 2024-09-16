/*
  Warnings:

  - You are about to drop the column `systemusersId` on the `systemroles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `systemroles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "systemroles" DROP COLUMN "systemusersId";

-- CreateIndex
CREATE UNIQUE INDEX "systemroles_name_key" ON "systemroles"("name");
