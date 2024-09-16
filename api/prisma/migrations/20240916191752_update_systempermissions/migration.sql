/*
  Warnings:

  - You are about to drop the column `systemresourcesId` on the `systempermissions` table. All the data in the column will be lost.
  - You are about to drop the column `systemrolesId` on the `systempermissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "systempermissions" DROP COLUMN "systemresourcesId",
DROP COLUMN "systemrolesId";
