"use client"

import type { ReactNode } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Package, LayoutDashboard, Users, Settings, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Inventory", href: "/dashboard", icon: Package },
    { name: "Users", href: "/dashboard/users", icon: Users, adminOnly: true },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-zinc-800 bg-zinc-950">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-zinc-800 px-6">
            <Package className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">InventoryPro</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              if (item.adminOnly && user?.role !== "admin") return null

              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-zinc-900 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="border-t border-zinc-800 p-4">
            <div className="mb-3 rounded-lg bg-zinc-900 p-3">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-zinc-400">{user?.email}</p>
              <p className="mt-1 text-xs text-zinc-500 capitalize">Role: {user?.role}</p>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-900"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
