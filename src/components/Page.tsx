import Header from "./Header"
import Footer from "./Footer"
import Main from "./Main"
import { useState } from "react"
import type { Department, Employee } from "../types/Employee"
import employeeData from "../data/employees.json"
import AddEmployeeToList from "./AddEmployeeToList"

function Page() {
  const [departments, setDepartments] = useState<Department[]>(employeeData)
  const [validationMessage, setValidationMessage] = useState<string>("")

  const handleAddEmployee = (
    newEmployee: Employee, departmentName: string
  ) => {
    setValidationMessage("")

    setDepartments((prevDepartments) =>
      prevDepartments.map((dept) =>
      dept.departmentName === departmentName
        ? { ...dept, employees: [...dept.employees, newEmployee]}
        : dept))
  }

  return (
    <>
      <Header />
      <Main departments={departments}/>
      <AddEmployeeToList
        departments={departments}
        onAddEmployee={handleAddEmployee}
        validationMessage={validationMessage}
      />

      <Footer />
    </>
  )
}

export default Page