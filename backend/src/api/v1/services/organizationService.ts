import type { Leadership } from "@fs-lab/shared-types";
import { leadershipData } from "../../../data/leadershipData";

/**
 * Get leadership member by ID
 * @param id - The leadership member ID
 * @returns - The leadership member
 */
export const getLeadershipById = async (id: string): Promise<Leadership | null> => {
    try {
        const leader = leadershipData.find(lead => lead.id === id);
        return leader || null;
    } catch (error) {
        console.error('Leadership member not found:', error);
        throw error;
    }
};

/**
 * Get all leadership members
 * @returns - All leadership members
 */
export const getAllLeadership = async (): Promise<Leadership[]> => {
    try {
        return leadershipData;
    } catch (error) {
        console.error('Error fetching leadership members:', error);
        throw error;
    }
};

/**
 * Create a new leadership member
 * @param data - The leadership member data
 * @returns - The created leadership member
 */
export const createLeadership = async (
    data: Omit<Leadership, "id">
): Promise<Leadership> => {
    try {
        const newLeader: Leadership = {
            id: (leadershipData.length + 1).toString(),
            ...data
        };
        leadershipData.push(newLeader);
        return newLeader;
    } catch (error) {
        console.error('Error creating leadership member:', error);
        throw error;
    }
};

/**
 * Update leadership member by ID
 * @param id - The leadership member ID
 * @param data - The updated leadership data
 * @returns - The updated leadership member
 */
export const updateLeadership = async (
    id: string,
    data: Partial<Leadership>
): Promise<Leadership | null> => {
    try {
        const index = leadershipData.findIndex(lead => lead.id === id);
        if (index === -1) return null;

        leadershipData[index] = { ...leadershipData[index], ...data };
        return leadershipData[index];
    } catch (error) {
        console.error('Error updating leadership member:', error);
        throw error;
    }
};

/**
 * Delete leadership member by ID
 * @param id - The leadership member ID
 * @returns - True if deleted, false otherwise
 */
export const deleteLeadership = async (id: string): Promise<boolean> => {
    try {
        const index = leadershipData.findIndex(lead => lead.id === id);
        if (index === -1) return false;

        leadershipData.splice(index, 1);
        return true;
    } catch (error) {
        console.error('Error deleting leadership member:', error);
        return false;
    }
};
