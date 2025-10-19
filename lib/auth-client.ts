'use client'

import { createAuthClient } from 'better-auth/react'

const BASE_URL = process.env.BASE_URL;

if (!BASE_URL) {
    throw new Error("Missing `BASE_URL` In your app, please fix!")
}

export const auth =  createAuthClient({
    baseURL: BASE_URL,
})