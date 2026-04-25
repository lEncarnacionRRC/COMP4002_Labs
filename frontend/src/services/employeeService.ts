import type { Validation } from "../hooks/useFormInput";
import type { Employee, Department } from "@fs-lab/shared-types";
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

  async validateDepartment(departmentName: string | number): Promise<Validation> {
    try {
      const departments = await employeeRepository.getDepartments();
      const dept = String(departmentName).trim();
      const exists = departments.some((d: Department) => d.departmentName === dept);

      if (!exists) {
        return { isValid: false, error: "Department does not exist" };
      }

      return { isValid: true, error: "" };
    } catch {
      return { isValid: false, error: "Failed to validate department" };
    }
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

  async createEmployee(
    firstName: string,
    lastName: string,
    departmentName: string
  ): Promise<{ isValid: boolean; error: string; employee?: Employee }> {
    try {
      const deptValidation = await this.validateDepartment(departmentName);
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

      await employeeRepository.add(departmentName, newEmployee);

      return { isValid: true, error: "", employee: newEmployee };
    } catch {
      return { isValid: false, error: "Failed to create employee" };
    }
  },

  async getDepartments() {
    try {
      return await employeeRepository.getDepartments();
    } catch (error) {
      console.error("Failed to fetch departments:", error);
      return [];
    }
  },

  async getAllEmployees() {
    try {
      return await employeeRepository.getAllEmployees();
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      return [];
    }
  }
};
