import type { Department, Employee } from "@fs-lab/shared-types"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const employeeRepository = {
  async getAll(): Promise<Department[]> {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await response.json();
    return data.data || [];
  },

  async getDepartment(departmentName: string): Promise<Department | undefined> {
    const departments = await this.getAll();
    return departments.find(dept => dept.departmentName === departmentName);
  },

  async getDepartments(): Promise<Department[]> {
    const response = await fetch(`${API_BASE_URL}/departments`);
    if (!response.ok) {
      throw new Error("Failed to fetch departments");
    }
    const data = await response.json();
    return data.data || [];
  },

  async getAllEmployees(): Promise<Employee[]> {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await response.json();
    return data.data || [];
  },

  async add(departmentName: string, employee: Employee): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: employee.firstName,
        lastName: employee.lastName,
        departmentId: departmentName
      })
    });
    
    if (!response.ok) {
      throw new Error("Failed to create employee");
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(_departmentName: string, _employeeIndex: number, _updatedEmployee: Employee): Promise<void> {
    // Not currently required by frontend - no PUT endpoint exposed
    console.warn("Update operation not implemented in backend");
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(_departmentName: string, _employeeIndex: number): Promise<void> {
    // Not currently required by frontend - no DELETE endpoint exposed
    console.warn("Delete operation not implemented in backend");
  }
};
