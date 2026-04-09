import type { Department, Employee } from "../types/Employee"
import employeeData from "../data/employees.json"

const departments: Department[] = [...employeeData]

export const employeeRepository = {
  getAll(): Department[] {
    return [...departments]
  },

  getDepartment(departmentName: string): Department | undefined {
    return departments.find(dept => dept.departmentName === departmentName)
  },

  getDepartments(): Department[] {
    return [...departments]
  },

  getAllEmployees(): Employee[] {
    return departments.flatMap(dept => dept.employees)
  },

  add(departmentName: string, employee: Employee): void {
    const department = this.getDepartment(departmentName)
    if (department) {
      department.employees.push(employee)
    }
  },

  update(departmentName: string, employeeIndex: number, updatedEmployee: Employee): void {
    const department = this.getDepartment(departmentName)
    if (department && employeeIndex >= 0 && employeeIndex < department.employees.length) {
      department.employees[employeeIndex] = updatedEmployee
    }
  },

  delete(departmentName: string, employeeIndex: number): void {
    const department = this.getDepartment(departmentName)
    if (department && employeeIndex >= 0 && employeeIndex < department.employees.length) {
      department.employees.splice(employeeIndex, 1)
    }
  }
}
