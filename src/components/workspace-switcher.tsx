import React from "react";
import { useGetWorkspaces } from "../features/workspaces/api/use-get-workspaces";

interface Workspace {
  _id: string;
  name: string;
}

interface WorkspacesResponse {
  documents: Workspace[];
  total: number;
}

export const WorkspaceSwitcher = () => {
  const { data, isLoading, error } = useGetWorkspaces();

  if (isLoading) {
    return <div>Loading workspaces...</div>;
  }

  if (error) {
    return <div className="text-red-600">Failed to load workspaces</div>;
  }

  // Defensive fallback
  // Log data to check actual structure during debugging
  console.log("WorkspaceSwitcher data:", data);

  // data could be { data: { documents: [...] } } or { documents: [...] }
  const workspaces =
    data && "data" in data
      ? (data.data as WorkspacesResponse)?.documents ?? []
      : data?.documents ?? [];

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {workspaces.map((workspace) => (
        <div
          key={workspace._id}
          className="p-2 bg-gray-200 rounded-md shadow-sm transition-all duration-300 hover:bg-gray-300 text-sm font-medium"
        >
          {workspace.name}
        </div>
      ))}
    </div>
  );
};
