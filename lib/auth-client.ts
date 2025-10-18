'use client'

import { createAuthClient } from 'better-auth/react'

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

export const auth =  createAuthClient({
    baseURL: BASE_URL,
})