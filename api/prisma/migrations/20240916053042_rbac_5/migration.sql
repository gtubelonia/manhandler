/*
  Warnings:

  - You are about to drop the column `systemresourcesId` on the `systemroles` table. All the data in the column will be lost.
  - You are about to drop the `_systempermissionsTosystemresources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_systempermissionsTosystemroles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_systemresourcesTosystemroles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_systempermissionsTosystemresources" DROP CONSTRAINT "_systempermissionsTosystemresources_A_fkey";

-- DropForeignKey
ALTER TABLE "_systempermissionsTosystemresources" DROP CONSTRAINT "_systempermissionsTosystemresources_B_fkey";

-- DropForeignKey
ALTER TABLE "_systempermissionsTosystemroles" DROP CONSTRAINT "_systempermissionsTosystemroles_A_fkey";

-- DropForeignKey
ALTER TABLE "_systempermissionsTosystemroles" DROP CONSTRAINT "_systempermissionsTosystemroles_B_fkey";

-- DropForeignKey
ALTER TABLE "_systemresourcesTosystemroles" DROP CONSTRAINT "_systemresourcesTosystemroles_A_fkey";

-- DropForeignKey
ALTER TABLE "_systemresourcesTosystemroles" DROP CONSTRAINT "_systemresourcesTosystemroles_B_fkey";

-- AlterTable
ALTER TABLE "systemroles" DROP COLUMN "systemresourcesId";

-- DropTable
DROP TABLE "_systempermissionsTosystemresources";

-- DropTable
DROP TABLE "_systempermissionsTosystemroles";

-- DropTable
DROP TABLE "_systemresourcesTosystemroles";

-- CreateTable
CREATE TABLE "systemresourcepermissions" (
    "systempermissionsId" INTEGER NOT NULL,
    "systemresourcesId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "systemresourcepermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_systemresourcepermissionsTosystemroles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "systemresourcepermissions_systemresourcesId_systempermissio_key" ON "systemresourcepermissions"("systemresourcesId", "systempermissionsId");

-- CreateIndex
CREATE UNIQUE INDEX "_systemresourcepermissionsTosystemroles_AB_unique" ON "_systemresourcepermissionsTosystemroles"("A", "B");

-- CreateIndex
CREATE INDEX "_systemresourcepermissionsTosystemroles_B_index" ON "_systemresourcepermissionsTosystemroles"("B");

-- AddForeignKey
ALTER TABLE "systemresourcepermissions" ADD CONSTRAINT "systemresourcepermissions_systempermissionsId_fkey" FOREIGN KEY ("systempermissionsId") REFERENCES "systempermissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systemresourcepermissions" ADD CONSTRAINT "systemresourcepermissions_systemresourcesId_fkey" FOREIGN KEY ("systemresourcesId") REFERENCES "systemresources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systemresourcepermissionsTosystemroles" ADD CONSTRAINT "_systemresourcepermissionsTosystemroles_A_fkey" FOREIGN KEY ("A") REFERENCES "systemresourcepermissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systemresourcepermissionsTosystemroles" ADD CONSTRAINT "_systemresourcepermissionsTosystemroles_B_fkey" FOREIGN KEY ("B") REFERENCES "systemroles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
