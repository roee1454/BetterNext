'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Settings,
  Menu,
} from 'lucide-react'
import { auth } from '@/lib/auth-client'


// ---------- Client component ----------
function getInitials(name?: string | null, email?: string | null) {
  const src = (name ?? email ?? '').trim()
  if (!src) return 'U'
  const parts = src.split(/\s+/).slice(0, 2)
  return parts.map(p => p[0]?.toUpperCase() ?? '').join('') || 'U'
}

const routes = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/settings', label: 'Settings', icon: Settings },
]

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav className="grid gap-1">
      {routes.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== '/' && pathname?.startsWith(href))
        return (
          <Link key={href} href={href} onClick={onNavigate}>
            <div
              className={cn(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" aria-hidden />
              <span className="truncate">{label}</span>
            </div>
          </Link>
        )
      })}
    </nav>
  )
}

function UserBadge({
  name,
  email,
  image,
  username,
}: {
  name?: string | null
  email?: string | null
  image?: string | null
  username?: string | null
}) {
  const displayName = name || username || email || 'User';
  const router = useRouter();

  const signOut = async () => {
    try {
        await auth.signOut();
        router.replace("/")
    } catch (err: unknown) {
        throw err;
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-2 py-1.5"
        >
          <Avatar className="h-7 w-7">
            <AvatarImage src={image ?? undefined} alt={displayName} />
            <AvatarFallback className="text-xs">
              {getInitials(name, email)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-left">
            <div className="truncate text-sm font-medium">{displayName}</div>
            {email && (
              <div className="truncate text-xs text-muted-foreground">{email}</div>
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
            <button onClick={signOut} className="w-full text-left">Sign out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2">
      {/* Replace with your actual <Image /> or SVG */}
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold">
        A
      </div>
      <div className="min-w-0">
        <div className="truncate font-semibold">AppName</div>
        <div className="truncate text-xs text-muted-foreground">Small muted tagline</div>
      </div>
    </Link>
  )
}

export function SidebarClient({
  user,
}: {
  user?: { name?: string | null; email?: string | null; image?: string | null; username?: string | null }
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar + drawer */}
      <div className="flex items-center justify-between p-3 md:hidden">
        <Brand />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <div className="flex h-full w-full flex-col">
              <div className="p-3">
                <Brand />
              </div>
              <SheetTitle></SheetTitle>
              <Separator />
              <ScrollArea className="flex-1 px-2 py-3">
                <NavList onNavigate={() => setOpen(false)} />
              </ScrollArea>
              <Separator />
              <div className="p-3">
                <UserBadge
                  name={user?.name}
                  email={user?.email}
                  image={user?.image ?? undefined}
                  username={user?.username}
                />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden md:flex md:w-64 md:flex-col md:border-r bg-background z-40">
        <div className="flex h-16 items-center px-3">
          <Brand />
        </div>
        <Separator />
        <ScrollArea className="flex-1 px-2 py-3">
          <NavList />
        </ScrollArea>
        <Separator />
        <div className="p-3">
          <UserBadge
            name={user?.name}
            email={user?.email}
            image={user?.image ?? undefined}
            username={user?.username}
          />
        </div>
      </aside>
    </>
  )
}
