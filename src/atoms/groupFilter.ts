import { atomWithStorage } from "jotai/utils";
import { useQuery } from "@tanstack/react-query";
import { collection } from "../client/conn";
import { Collections, GroupsResponse } from "../client/types.gen";

// Create an atom with localStorage persistence
export const groupFilterAtom = atomWithStorage<string | null>(
  "groupFilter",
  null
);

// Helper function to get the display name for a group
export function getGroupDisplayName(groupId: string | null, groups: GroupsResponse[]): string {
  if (!groupId) return "All groups";
  
  const group = groups.find(g => g.id === groupId);
  return group?.name ?? "Unknown group";
}

// Hook to fetch all available groups
export function useGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const response = await collection(Collections.Groups, {
        sort: "name",
      }).queryFn();
      return response as GroupsResponse[];
    },
  });
}
