import type { Validation } from "../hooks/useFormInput";
import type { Leadership } from "../types/Employee";
import { organizationRepository } from "../repositories/organizationRepository";

type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export const organizationService = {
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

  validateRole(role: string | number): Validation {
    const roleStr = String(role).trim();

    if (roleStr.length === 0) {
      return { isValid: false, error: "Role is required" };
    }

    return { isValid: true, error: "" };
  },

  validateLeader(leader: Omit<Leadership, "id">): ValidationResult {
    const errors: string[] = [];

    const firstNameVal = this.validateFirstName(leader.firstName);
    if (!firstNameVal.isValid) {
      errors.push(firstNameVal.error);
    }

    const lastNameVal = this.validateLastName(leader.lastName);
    if (!lastNameVal.isValid) {
      errors.push(lastNameVal.error);
    }

    const roleVal = this.validateRole(leader.role);
    if (!roleVal.isValid) {
      errors.push(roleVal.error);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  async getLeadership(): Promise<Leadership[]> {
    try {
      return await organizationRepository.getAll();
    } catch {
      console.error("Failed to fetch leadership");
      return [];
    }
  },

  createLeader(
    firstName: string,
    lastName: string,
    role: string
  ): { isValid: boolean; error: string; leader?: Leadership } {
    const firstNameValidation = this.validateFirstName(firstName);
    if (!firstNameValidation.isValid) {
      return { isValid: false, error: firstNameValidation.error };
    }

    const lastNameValidation = this.validateLastName(lastName);
    if (!lastNameValidation.isValid) {
      return { isValid: false, error: lastNameValidation.error };
    }

    const roleValidation = this.validateRole(role);
    if (!roleValidation.isValid) {
      return { isValid: false, error: roleValidation.error };
    }

    const newLeader: Leadership = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      role: role.trim()
    };

    organizationRepository.add(newLeader);

    return { isValid: true, error: "", leader: newLeader };
  }
};
