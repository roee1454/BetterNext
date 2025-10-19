'use client'

import { VerificationAlert } from '@/components/email/verification-alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/auth-client';

export default function DashboardPage() {
  const { data: session } = auth.useSession()
  
  if (!session) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Message */}
        <div>
          <h1 className="text-4xl font-bold">
            Hello, {user?.name || 'there'}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">Welcome to your dashboard</p>
        </div>

        {/* Email verfication alert in case email is not verfied */}
        { !user.emailVerified && <VerificationAlert user={user} /> }

        {/* Dashboard Content */}
        <h1 className='text-2xl font-bold'>Overview:</h1>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">48</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}