import SideBar  from "@/components/layout/server/side-bar-server";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function RootLayout({ children }: { children: ReactNode }) {
    const session = await getSession();
    if (!session) redirect('/auth')
    return (
        <div className="">
            <SideBar />
            <main className="min-h-dvh md:pl-64">
                {children}
            </main>
        </div>
    )
}