import type { Department } from "@fs-lab/shared-types";
import { departmentData } from "../../../data/departmentData";

/**
 * Get department by ID
 * @param id - The department ID
 * @returns - The department if found, null otherwise
 */
export const getDepartmentById = async (id: string): Promise<Department | null> => {
    try {
        const department = departmentData.find((dept: Department) => dept.id === id);
        return department || null;
    } catch (error) {
        console.error("Department not found:", error);
        throw error;
    }
};

/**
 * Get all departments
 * @returns - All departments
 */
export const getAllDepartments = async (): Promise<Department[]> => {
    try {
        return departmentData;
    } catch (error) {
        console.error("Failed to fetch departments:", error);
        throw error;
    }
};

/**
 * Create a new department
 * @param data - The department data
 * @returns - The created department
 */
export const createDepartment = async (
    data: Omit<Department, "id">
): Promise<Department> => {
    try {
        const newDepartment: Department = {
            id: (departmentData.length + 1).toString(),
            ...data
        };
        departmentData.push(newDepartment);
        return newDepartment;
    } catch (error) {
        console.error("Failed to create department:", error);
        throw error;
    }
};

/**
 * Update department by ID
 * @param id - The department ID
 * @param data - The updated department data
 * @returns - The updated department
 */
export const updateDepartment = async (
    id: string,
    data: Partial<Department>
): Promise<Department | null> => {
    try {
        const index = departmentData.findIndex((dept: Department) => dept.id === id);
        if (index === -1) return null;

        departmentData[index] = { ...departmentData[index], ...data };
        return departmentData[index];
    } catch (error) {
        console.error("Failed to update department:", error);
        throw error;
    }
};

/**
 * Delete department by ID
 * @param id - The department ID
 * @returns - True if deleted and false otherwise
 */
export const deleteDepartment = async (id: string): Promise<boolean> => {
    try {
        const index = departmentData.findIndex((dept: Department) => dept.id === id);
        if (index === -1) return false;

        departmentData.splice(index, 1);
        return true;
    } catch (error) {
        console.error("Failed to delete department:", error);
        return false;
    }
};
