import { VerificationAlert } from '@/components/email/verification-alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession()
  const user = session?.user;

  if (!user) {
    return redirect("/auth")
  }

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