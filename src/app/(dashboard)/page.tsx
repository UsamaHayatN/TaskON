import { getCurrent } from "@/features/auth/quries";
import { redirect } from "next/navigation";
import { getWorkspaces } from "@/features/workspaces/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrent();
  if (!user) {
    redirect("/sign-in");
  }
  const workspaces = await getWorkspaces();
  if (workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }

  // Fallback to avoid build issues
  return null;
}
