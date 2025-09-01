import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/quries";

import WorkspaceIdJoinClient from "./client";

const WorkspaceIdJoinPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
