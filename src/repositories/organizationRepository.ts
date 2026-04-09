import type { Leadership } from "../types/Employee";
import leadershipData from "../data/leadership.json";

let leaders: Leadership[] = [...(leadershipData[0]?.employees || [])];

export const organizationRepository = {
  getAll(): Leadership[] {
    return [...leaders];
  },

  getByRole(role: string): Leadership | undefined {
    return leaders.find(leader => leader.role === role);
  },

  update(role: string, updatedLeader: Leadership): void {
    const index = leaders.findIndex(leader => leader.role === role);
    if (index !== -1) {
      leaders[index] = updatedLeader;
    }
  },

  delete(role: string): void {
    leaders = leaders.filter(leader => leader.role !== role);
  },

  add(newLeader: Leadership): void {
    leaders.push(newLeader);
  }
};
