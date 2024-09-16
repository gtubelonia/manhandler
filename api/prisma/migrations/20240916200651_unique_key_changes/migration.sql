/*
  Warnings:

  - A unique constraint covering the columns `[permissiontype]` on the table `systempermissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `systemresources` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "systempermissions_permissiontype_key" ON "systempermissions"("permissiontype");

-- CreateIndex
CREATE UNIQUE INDEX "systemresources_name_key" ON "systemresources"("name");
