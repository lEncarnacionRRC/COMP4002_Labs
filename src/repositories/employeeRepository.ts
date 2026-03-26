import type { Department, Employee } from "../types/Employee"
import employeeData from "../data/employees.json"

class EmployeeRepository {
  private departments: Department[] = employeeData

  // Get all departments with employees
  getDepartments(): Department[] {
    return this.departments
  }

  // Get a specific department
  getDepartment(departmentName: string): Department | undefined {
    return this.departments.find(dept => dept.departmentName === departmentName)
  }

  createEmployee(departmentName: string, employee: Employee): Employee | null {
    const department = this.getDepartment(departmentName)
    
    if (!department) {
      return null
    }

    department.employees.push(employee)
    return employee
  }

  getAllEmployees(): Employee[] {
    return this.departments.flatMap(dept => dept.employees)
  }
}

export const employeeRepository = new EmployeeRepository()
