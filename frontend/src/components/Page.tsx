import Main from "./Main"
import { useState, useEffect } from "react"
import type { Department, Employee } from "../types/Employee"
import { employeeService } from "../services/employeeService"
import AddEmployeeToList from "./employees/AddEmployeeToList"

function Page() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch departments and employees from backend
      const depts = await employeeService.getDepartments()
      const employees = await employeeService.getAllEmployees()

      // Restructure employees into departments
      const departmentsWithEmployees: Department[] = depts.map((dept: Department) => ({
        ...dept,
        employees: employees.filter((emp: Employee) => emp.departmentId === dept.id) || []
      }))

      setDepartments(departmentsWithEmployees)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load data"
      setError(errorMessage)
      console.error("Error loading data:", errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddEmployee = (success: boolean, error?: string) => {
    if (success) {
      loadData()
    } else {
      console.error("Failed to add employee:", error)
    }
  }

  if (loading) {
    return <div className="p-4">Loading...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
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