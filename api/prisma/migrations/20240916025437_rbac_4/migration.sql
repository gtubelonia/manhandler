-- DropForeignKey
ALTER TABLE "systempermissions" DROP CONSTRAINT "systempermissions_systemresourcesId_fkey";

-- DropForeignKey
ALTER TABLE "systempermissions" DROP CONSTRAINT "systempermissions_systemrolesId_fkey";

-- DropForeignKey
ALTER TABLE "systemroles" DROP CONSTRAINT "systemroles_systemusersId_fkey";

-- AlterTable
ALTER TABLE "systemroles" ADD COLUMN     "systemresourcesId" INTEGER;

-- CreateTable
CREATE TABLE "_systempermissionsTosystemroles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_systempermissionsTosystemresources" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_systemresourcesTosystemroles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_systemrolesTosystemusers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_systempermissionsTosystemroles_AB_unique" ON "_systempermissionsTosystemroles"("A", "B");

-- CreateIndex
CREATE INDEX "_systempermissionsTosystemroles_B_index" ON "_systempermissionsTosystemroles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_systempermissionsTosystemresources_AB_unique" ON "_systempermissionsTosystemresources"("A", "B");

-- CreateIndex
CREATE INDEX "_systempermissionsTosystemresources_B_index" ON "_systempermissionsTosystemresources"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_systemresourcesTosystemroles_AB_unique" ON "_systemresourcesTosystemroles"("A", "B");

-- CreateIndex
CREATE INDEX "_systemresourcesTosystemroles_B_index" ON "_systemresourcesTosystemroles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_systemrolesTosystemusers_AB_unique" ON "_systemrolesTosystemusers"("A", "B");

-- CreateIndex
CREATE INDEX "_systemrolesTosystemusers_B_index" ON "_systemrolesTosystemusers"("B");

-- AddForeignKey
ALTER TABLE "_systempermissionsTosystemroles" ADD CONSTRAINT "_systempermissionsTosystemroles_A_fkey" FOREIGN KEY ("A") REFERENCES "systempermissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systempermissionsTosystemroles" ADD CONSTRAINT "_systempermissionsTosystemroles_B_fkey" FOREIGN KEY ("B") REFERENCES "systemroles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systempermissionsTosystemresources" ADD CONSTRAINT "_systempermissionsTosystemresources_A_fkey" FOREIGN KEY ("A") REFERENCES "systempermissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systempermissionsTosystemresources" ADD CONSTRAINT "_systempermissionsTosystemresources_B_fkey" FOREIGN KEY ("B") REFERENCES "systemresources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systemresourcesTosystemroles" ADD CONSTRAINT "_systemresourcesTosystemroles_A_fkey" FOREIGN KEY ("A") REFERENCES "systemresources"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systemresourcesTosystemroles" ADD CONSTRAINT "_systemresourcesTosystemroles_B_fkey" FOREIGN KEY ("B") REFERENCES "systemroles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systemrolesTosystemusers" ADD CONSTRAINT "_systemrolesTosystemusers_A_fkey" FOREIGN KEY ("A") REFERENCES "systemroles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systemrolesTosystemusers" ADD CONSTRAINT "_systemrolesTosystemusers_B_fkey" FOREIGN KEY ("B") REFERENCES "systemusers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
