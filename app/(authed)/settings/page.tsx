import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    const session = await getSession();
    const user = session?.user;

    if (!user) {
        return redirect("/auth")
    }

    return (
        <div className="bg-background p-8">
            Settings for {user.name}
        </div>
    )
}