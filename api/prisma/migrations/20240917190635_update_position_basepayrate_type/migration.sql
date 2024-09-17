/*
  Warnings:

  - The `basepayrate` column on the `positions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "positions" DROP COLUMN "basepayrate",
ADD COLUMN     "basepayrate" MONEY;
