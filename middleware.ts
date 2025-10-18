import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(!session && request.url.includes("/dashboard")) {
        return NextResponse.redirect(new URL("/auth", request.url));
    }
    
    if (session && request.url.includes("/auth")) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard", "/welcome", '/auth'], // Apply middleware to specific routes
};