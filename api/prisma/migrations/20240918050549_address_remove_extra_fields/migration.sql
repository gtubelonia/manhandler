/*
  Warnings:

  - You are about to drop the column `firstname` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "address" DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "phone";
