-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "isactive" BOOLEAN,
    "activationdate" DATE,
    "deactivationdate" VARCHAR,
    "lead" INTEGER,

    CONSTRAINT "department_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employeeposition" (
    "employeeid" INTEGER NOT NULL,
    "positionid" INTEGER NOT NULL,

    CONSTRAINT "employeeposition_pk" PRIMARY KEY ("employeeid","positionid")
);

-- CreateTable
CREATE TABLE "employees" (
    "firstname" VARCHAR NOT NULL,
    "middlename" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "payrate" MONEY,
    "active" BOOLEAN,
    "startdate" DATE,
    "enddate" DATE,
    "employeeid" SERIAL NOT NULL,
    "team" INTEGER,
    "department" INTEGER,

    CONSTRAINT "employee_pk" PRIMARY KEY ("employeeid")
);

-- CreateTable
CREATE TABLE "phone" (
    "id" SERIAL NOT NULL,
    "countrycode" INTEGER NOT NULL,
    "areacode" INTEGER NOT NULL,
    "phonenumber" VARCHAR NOT NULL,
    "phonetype" INTEGER NOT NULL,
    "employeeid" INTEGER NOT NULL,

    CONSTRAINT "phone_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phonetype" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "phonetype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "addressid" SERIAL NOT NULL,
    "employeeid" INTEGER NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "address1" VARCHAR,
    "address2" VARCHAR,
    "city" VARCHAR,
    "state" VARCHAR,
    "zipcode" VARCHAR,

    CONSTRAINT "address_pk" PRIMARY KEY ("addressid")
);

-- CreateTable
CREATE TABLE "positions" (
    "positionid" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "basepayrate" MONEY,

    CONSTRAINT "position_pk" PRIMARY KEY ("positionid")
);

-- CreateTable
CREATE TABLE "systempermissions" (
    "id" SERIAL NOT NULL,
    "permissiontype" VARCHAR,

    CONSTRAINT "systempermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "systemresources" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "description" VARCHAR,

    CONSTRAINT "systemresources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "systemresourcepermissions" (
    "systempermissionsId" INTEGER NOT NULL,
    "systemresourcesId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "systemresourcepermissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "systemroles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "description" VARCHAR,

    CONSTRAINT "systemroles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "systemusers" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR,
    "email" VARCHAR,
    "password" VARCHAR,
    "active" BOOLEAN,
    "createdate" DATE,
    "deactivatedate" DATE,

    CONSTRAINT "systemusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "lead" INTEGER NOT NULL,
    "isactive" BOOLEAN,
    "activationdate" DATE,
    "deactivationdate" DATE,

    CONSTRAINT "team_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_systemresourcepermissionsTosystemroles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_systemrolesTosystemusers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "positions_name_key" ON "positions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "systempermissions_permissiontype_key" ON "systempermissions"("permissiontype");

-- CreateIndex
CREATE UNIQUE INDEX "systemresources_name_key" ON "systemresources"("name");

-- CreateIndex
CREATE UNIQUE INDEX "systemresourcepermissions_systemresourcesId_systempermissio_key" ON "systemresourcepermissions"("systemresourcesId", "systempermissionsId");

-- CreateIndex
CREATE UNIQUE INDEX "systemroles_name_key" ON "systemroles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "systemusers_unique" ON "systemusers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_systemresourcepermissionsTosystemroles_AB_unique" ON "_systemresourcepermissionsTosystemroles"("A", "B");

-- CreateIndex
CREATE INDEX "_systemresourcepermissionsTosystemroles_B_index" ON "_systemresourcepermissionsTosystemroles"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_systemrolesTosystemusers_AB_unique" ON "_systemrolesTosystemusers"("A", "B");

-- CreateIndex
CREATE INDEX "_systemrolesTosystemusers_B_index" ON "_systemrolesTosystemusers"("B");

-- AddForeignKey
ALTER TABLE "employeeposition" ADD CONSTRAINT "employeeposition_employee_fk" FOREIGN KEY ("employeeid") REFERENCES "employees"("employeeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employeeposition" ADD CONSTRAINT "employeeposition_position_fk" FOREIGN KEY ("positionid") REFERENCES "positions"("positionid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_phonetype_fk" FOREIGN KEY ("phonetype") REFERENCES "phonetype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_employeeid_fkey" FOREIGN KEY ("employeeid") REFERENCES "employees"("employeeid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_person_fk" FOREIGN KEY ("employeeid") REFERENCES "employees"("employeeid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "systemresourcepermissions" ADD CONSTRAINT "systemresourcepermissions_systempermissionsId_fkey" FOREIGN KEY ("systempermissionsId") REFERENCES "systempermissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "systemresourcepermissions" ADD CONSTRAINT "systemresourcepermissions_systemresourcesId_fkey" FOREIGN KEY ("systemresourcesId") REFERENCES "systemresources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "team_employee_fk" FOREIGN KEY ("lead") REFERENCES "employees"("employeeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_systemresourcepermissionsTosystemroles" ADD CONSTRAINT "_systemresourcepermissionsTosystemroles_A_fkey" FOREIGN KEY ("A") REFERENCES "systemresourcepermissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systemresourcepermissionsTosystemroles" ADD CONSTRAINT "_systemresourcepermissionsTosystemroles_B_fkey" FOREIGN KEY ("B") REFERENCES "systemroles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systemrolesTosystemusers" ADD CONSTRAINT "_systemrolesTosystemusers_A_fkey" FOREIGN KEY ("A") REFERENCES "systemroles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_systemrolesTosystemusers" ADD CONSTRAINT "_systemrolesTosystemusers_B_fkey" FOREIGN KEY ("B") REFERENCES "systemusers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
