'use client'

import { createAuthClient } from 'better-auth/react'

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!NEXT_PUBLIC_BASE_URL) {
    throw new Error("Missing `NEXT_PUBLIC_BASE_URL` In your app, please fix!")
}

export const auth =  createAuthClient({
    baseURL: NEXT_PUBLIC_BASE_URL,
})