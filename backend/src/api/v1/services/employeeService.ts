import type { Employee, Department } from "@fs-lab/shared-types";
import { employeeData } from "../../../data/employeeData";
import { departmentData } from "../../../data/departmentData";
import type { Leadership } from "@fs-lab/shared-types";
import { leadershipData } from "../../../data/leadershipData";

/**
 * Get all employees
 * @returns - All employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        return employeeData;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

/**
 * Create a new employee
 * @param data - The employee data
 * @returns - The created employee
 */
export const createEmployee = async (
    data: Omit<Employee, "id">
): Promise<Employee> => {
    try {
        const newEmployee: Employee = {
            id: (employeeData.length + 1).toString(),
            ...data
        };
        employeeData.push(newEmployee);
        return newEmployee;
    } catch (error) {
        console.error('Error creating employee:', error);
        throw error;
    }
};

/**
 * Get all departments
 * @returns - All departments
 */
export const getDepartments = async (): Promise<Department[]> => {
    try {
        return departmentData;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

/**
 * Get all leadership data
 * @returns - All leadership members
 */
export const getLeadership = async (): Promise<Leadership[]> => {
    try {
        return leadershipData;
    } catch (error) {
        console.error('Error fetching leadership:', error);
        throw error;
    }
};

