-- AlterTable
ALTER TABLE "systempermissions" ADD COLUMN     "systemresourcesId" INTEGER,
ADD COLUMN     "systemrolesId" INTEGER;

-- AlterTable
ALTER TABLE "systemroles" ADD COLUMN     "systemusersId" INTEGER;

-- AddForeignKey
ALTER TABLE "systempermissions" ADD CONSTRAINT "systempermissions_systemrolesId_fkey" FOREIGN KEY ("systemrolesId") REFERENCES "systemroles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systempermissions" ADD CONSTRAINT "systempermissions_systemresourcesId_fkey" FOREIGN KEY ("systemresourcesId") REFERENCES "systemresources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systemroles" ADD CONSTRAINT "systemroles_systemusersId_fkey" FOREIGN KEY ("systemusersId") REFERENCES "systemusers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
