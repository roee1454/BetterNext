import { SidebarClient }  from "@/components/layout/side-bar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getSession();
    if (!session || !session.user) redirect('/auth')
    return (
        <div className="">
            <SidebarClient user={session.user} />
            <main className="min-h-dvh md:pl-64">
                {children}
            </main>
        </div>
    )
}