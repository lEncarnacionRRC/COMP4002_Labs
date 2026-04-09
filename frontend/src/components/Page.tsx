import Main from "./Main"
import { useState } from "react"
import type { Department } from "../types/Employee"
import { employeeRepository } from "../repositories/employeeRepository"
import AddEmployeeToList from "./employees/AddEmployeeToList"

function Page() {
  const [departments, setDepartments] = useState<Department[]>(() => 
    employeeRepository.getDepartments()
  )

  const handleAddEmployee = (success: boolean, error?: string) => {
    if (success) {
      const updatedDepts = employeeRepository.getDepartments()
      setDepartments([...updatedDepts])
    } else {
      console.error("Failed to add employee:", error)
    }
  }

  return (
    <>
      <Main departments={departments}/>
      <AddEmployeeToList
        departments={departments}
        onAddEmployee={handleAddEmployee}
      />
    </>
  )
}

export default Page