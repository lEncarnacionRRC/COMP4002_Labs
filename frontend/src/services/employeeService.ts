import type { Validation } from "../hooks/useFormInput";
import type { Employee } from "../types/Employee";
import { employeeRepository } from "../repositories/employeeRepository";

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export const employeeService = {
  validateFirstName(firstName: string | number): Validation {
    const name = String(firstName).trim();

    if (name.length === 0) {
      return { isValid: false, error: "First name is required" };
    }

    if (name.length < 3) {
      return { isValid: false, error: "First name must be at least 3 characters" };
    }

    return { isValid: true, error: "" };
  },

  validateLastName(lastName: string | number): Validation {
    const name = String(lastName).trim();

    if (name.length === 0) {
      return { isValid: false, error: "Last name is required" };
    }

    return { isValid: true, error: "" };
  },

  validateDepartment(departmentName: string | number): Validation {
    const dept = String(departmentName).trim();
    const departments = employeeRepository.getAll();
    const exists = departments.some(d => d.departmentName === dept);

    if (!exists) {
      return { isValid: false, error: "Department does not exist" };
    }

    return { isValid: true, error: "" };
  },

  validateEmployee(employee: Omit<Employee, "id">): ValidationResult {
    const errors: string[] = [];

    if (!employee.firstName || employee.firstName.trim().length < 3) {
      errors.push("First name must be at least 3 characters.");
    }

    if (!employee.lastName || employee.lastName.trim().length === 0) {
      errors.push("Last name is required.");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  createEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
  ): { isValid: boolean; error: string; employee?: Employee } {
    const deptValidation = this.validateDepartment(departmentName);
    if (!deptValidation.isValid) {
      return { isValid: false, error: deptValidation.error };
    }

    const firstNameValidation = this.validateFirstName(firstName);
    if (!firstNameValidation.isValid) {
      return { isValid: false, error: firstNameValidation.error };
    }

    const lastNameValidation = this.validateLastName(lastName);
    if (!lastNameValidation.isValid) {
      return { isValid: false, error: lastNameValidation.error };
    }

    const newEmployee: Employee = {
      firstName: firstName.trim(),
      lastName: lastName.trim()
    };

    employeeRepository.add(departmentName, newEmployee);

    return { isValid: true, error: "", employee: newEmployee };
  },

  getDepartments() {
    return employeeRepository.getAll();
  },

  getAllEmployees() {
    return employeeRepository.getAllEmployees();
  }
};
