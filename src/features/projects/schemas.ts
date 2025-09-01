import { PROJECTS_ID } from "@/config";
import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, "Required"),
  workspaceId: z.string(),
});
export const updateProjectSchema = z.object({
  name: z.string().trim().min(1, "Minimum 1 character required").optional(),
});
