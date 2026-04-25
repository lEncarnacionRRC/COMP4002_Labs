import type { Leadership } from "../types/Employee";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const organizationRepository = {
  async getAll(): Promise<Leadership[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/leadership`);
      if (!response.ok) {
        throw new Error("Failed to fetch leadership data");
      }
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching leadership:", error);
      return [];
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getByRole(_role: string): Promise<Leadership | undefined> {
    const leaders = await this.getAll();
    return leaders.find(leader => leader.role === _role);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(_role: string, _updatedLeader: Leadership): Promise<void> {
    // Not currently required by frontend
    console.warn("Update operation not implemented in backend");
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async delete(_role: string): Promise<void> {
    // Not currently required by frontend
    console.warn("Delete operation not implemented in backend");
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async add(_newLeader: Leadership): Promise<void> {
    // Not currently required by frontend
    console.warn("Add operation not implemented in backend");
  }
};
