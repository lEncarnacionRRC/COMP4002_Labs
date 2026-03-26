import Main from "./Main"
import { useState } from "react"
import type { Department, Employee } from "../types/Employee"
import employeeData from "../data/employees.json"
import AddEmployeeToList from "./employees/AddEmployeeToList"

function Page() {
  const [departments, setDepartments] = useState<Department[]>(employeeData)
  const [validationMessage, setValidationMessage] = useState<string>("")

  const handleAddEmployee = (
    newEmployee: Employee, departmentName: string
  ) => {
    if (newEmployee.firstName.length < 2) {
      setValidationMessage("First name must be at least 2 characters.")
      return
    }

    setValidationMessage("")

    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
      dept.departmentName === departmentName
        ? { ...dept, employees: [...dept.employees, newEmployee]}
        : dept))
  }

  return (
    <>
      <Main departments={departments}/>
      <AddEmployeeToList
        departments={departments}
        onAddEmployee={handleAddEmployee}
        validationMessage={validationMessage}
      />
    </>
  )
}

export default Page