import type { Validation } from "../hooks/useFormInput"
import type { Employee } from "../types/Employee"
import { employeeRepository } from "../repositories/employeeRepository"

interface CreateEmployeeResult {
  isValid: boolean
  error: string
  employee?: Employee
}

class EmployeeService {

  validateFirstName(firstName: string | number): Validation {
    const name = String(firstName).trim()

    if (name.length === 0) {
      return { isValid: false, error: "First name is required" }
    }

    if (name.length < 3) {
      return { isValid: false, error: "First name must be at least 3 characters" }
    }

    return { isValid: true, error: "" }
  }


  validateLastName(lastName: string | number): Validation {
    const name = String(lastName).trim()

    if (name.length === 0) {
      return { isValid: false, error: "Last name is required" }
    }

    return { isValid: true, error: "" }
  }


  validateDepartment(departmentName: string | number): Validation {
    const dept = String(departmentName).trim()
    const departments = employeeRepository.getDepartments()
    const exists = departments.some(d => d.departmentName === dept)

    if (!exists) {
      return { isValid: false, error: "Department does not exist" }
    }

    return { isValid: true, error: "" }
  }


  createEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
  ): CreateEmployeeResult {

    const deptValidation = this.validateDepartment(departmentName)
    if (!deptValidation.isValid) {
      return { isValid: false, error: deptValidation.error }
    }


    const firstNameValidation = this.validateFirstName(firstName)
    if (!firstNameValidation.isValid) {
      return { isValid: false, error: firstNameValidation.error }
    }

    const lastNameValidation = this.validateLastName(lastName)
    if (!lastNameValidation.isValid) {
      return { isValid: false, error: lastNameValidation.error }
    }


    const newEmployee: Employee = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
    }


    const created = employeeRepository.createEmployee(departmentName, newEmployee)

    if (!created) {
      return { isValid: false, error: "Failed to create employee" }
    }

    return { isValid: true, error: "", employee: created }
  }


  getDepartments() {
    return employeeRepository.getDepartments()
  }
}

export const employeeService = new EmployeeService()
