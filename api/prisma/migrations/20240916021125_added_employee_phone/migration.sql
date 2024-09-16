/*
  Warnings:

  - Added the required column `employeeid` to the `phone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "phone" ADD COLUMN     "employeeid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "employees"("employeeid") ON DELETE RESTRICT ON UPDATE CASCADE;
