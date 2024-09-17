-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employee_department_fk";

-- AddForeignKey
ALTER TABLE "departments" ADD CONSTRAINT "departments_lead_fkey" FOREIGN KEY ("lead") REFERENCES "employees"("employeeid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_fkey" FOREIGN KEY ("department") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
