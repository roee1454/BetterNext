import { getSession } from "@/lib/auth"
import { SidebarClient } from "../side-bar";
import { redirect } from "next/navigation";


// ---------- Server component wrapper ----------
export default async function SideBar() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return redirect("/auth")
  }

  return <SidebarClient user={user} />
}
