-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employee_department_fk" FOREIGN KEY ("department") REFERENCES "departments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
