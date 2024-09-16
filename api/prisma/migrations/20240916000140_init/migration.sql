-- CreateTable
CREATE TABLE "departments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "isactive" BOOLEAN,
    "activationdate" DATE,
    "deactivationdate" VARCHAR,
    "lead" INTEGER,

    CONSTRAINT "department_pk" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "employeeposition" (
    "employeeid" INTEGER NOT NULL,
    "positionid" INTEGER NOT NULL,

    CONSTRAINT "employeeposition_pk" PRIMARY KEY ("employeeid","positionid")
);

-- CreateTable
CREATE TABLE "employees" (
    "personid" INTEGER NOT NULL,
    "payrate" MONEY,
    "active" BOOLEAN,
    "startdate" DATE,
    "enddate" DATE,
    "employeeid" SERIAL NOT NULL,
    "team" INTEGER,
    "department" VARCHAR,

    CONSTRAINT "employee_pk" PRIMARY KEY ("employeeid")
);

-- CreateTable
CREATE TABLE "persons" (
    "personid" SERIAL NOT NULL,
    "firstname" VARCHAR NOT NULL,
    "lastname" VARCHAR NOT NULL,
    "phone" VARCHAR,
    "address1" VARCHAR,
    "address2" VARCHAR,
    "city" VARCHAR,
    "state" VARCHAR,
    "zipcode" VARCHAR,

    CONSTRAINT "person_pk" PRIMARY KEY ("personid")
);

-- CreateTable
CREATE TABLE "positions" (
    "positionid" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR,
    "basepayrate" VARCHAR,

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

-- CreateIndex
CREATE UNIQUE INDEX "position_unique" ON "positions"("name");

-- AddForeignKey
ALTER TABLE "employeeposition" ADD CONSTRAINT "employeeposition_employee_fk" FOREIGN KEY ("employeeid") REFERENCES "employees"("employeeid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employeeposition" ADD CONSTRAINT "employeeposition_position_fk" FOREIGN KEY ("positionid") REFERENCES "positions"("positionid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employee_department_fk" FOREIGN KEY ("department") REFERENCES "departments"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employee_person_fk" FOREIGN KEY ("personid") REFERENCES "persons"("personid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "team_employee_fk" FOREIGN KEY ("lead") REFERENCES "employees"("employeeid") ON DELETE NO ACTION ON UPDATE NO ACTION;
