import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface UseGetMembersProp {
  workspaceId: string;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProp) => {
  const query = useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const response = await client.api.members.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to Fetch Members");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
