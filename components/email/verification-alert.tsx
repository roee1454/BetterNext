'use client'

import { type User } from 'better-auth'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import { Button } from '@/components//ui/button'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { auth } from '@/lib/auth-client'

interface VerificationAlertProps {
    user: User
}

export function VerificationAlert({ user }: VerificationAlertProps) {
    const [sent, setSent] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)

    const handleVerification = async () => {
        setLoading(true)
        try {
            await auth.sendVerificationEmail({ email: user.email })
            setSent(true)
        } catch (err: unknown) {
            console.error(err)
            throw new Error("Unknown error prevented mail transaction, please check error message above!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Alert variant={"default"}>
          <AlertTitle className='flex justify-start items-center gap-2'>
            <Info />
            <span>Wait a second!</span>
          </AlertTitle>
          <AlertDescription>
            <div className='w-full flex justify-between items-center gap-4'>
              <p>It looks like your email address have not been verified by us yet.</p>
              <Button disabled={sent || loading} onClick={handleVerification}>
                {loading ? ( 
                    <div className='flex flex-row justify-center items-center gap-2'><Loader2 className='animate-spin' /><span>Requesting verification.</span></div>
                ) : (<span>{sent ? "Request sent." : "Send verfication request."}</span>)}
              </Button>
            </div>
          </AlertDescription>
        </Alert>
    )
}