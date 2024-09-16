/*
  Warnings:

  - You are about to drop the column `personid` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `persons` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstname` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `employees` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middlename` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employee_person_fk";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "personid",
ADD COLUMN     "firstname" VARCHAR NOT NULL,
ADD COLUMN     "lastname" VARCHAR NOT NULL,
ADD COLUMN     "middlename" VARCHAR NOT NULL;

-- DropTable
DROP TABLE "persons";

-- CreateTable
CREATE TABLE "phone" (
    "id" SERIAL NOT NULL,
    "countrycode" INTEGER NOT NULL,
    "areacode" INTEGER NOT NULL,
    "phonenumber" VARCHAR NOT NULL,
    "phonetype" INTEGER NOT NULL,

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

-- AddForeignKey
ALTER TABLE "phone" ADD CONSTRAINT "phone_phonetype_fk" FOREIGN KEY ("phonetype") REFERENCES "phonetype"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_person_fk" FOREIGN KEY ("employeeid") REFERENCES "employees"("employeeid") ON DELETE CASCADE ON UPDATE NO ACTION;
