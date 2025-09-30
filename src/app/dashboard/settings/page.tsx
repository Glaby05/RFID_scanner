"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { PermissionsInfo } from "@/components/dashboard/permissions-info"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import { RoleBadge } from "@/components/auth/role-badge"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-zinc-400">Manage your account and preferences</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-400">Name</p>
                  <p className="text-white font-medium">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Email</p>
                  <p className="text-white font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400 mb-2">Role</p>
                  <RoleBadge role={user?.role || "viewer"} />
                </div>
              </CardContent>
            </Card>

            <PermissionsInfo />
          </div>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardHeader>
              <CardTitle className="text-white">Role Hierarchy</CardTitle>
              <CardDescription>Understanding access levels in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-purple-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <RoleBadge role="admin" />
                    <span className="text-xs text-zinc-500">Highest Access</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Full system access including user management, all inventory operations, and system settings.
                  </p>
                </div>

                <div className="border-l-2 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <RoleBadge role="manager" />
                    <span className="text-xs text-zinc-500">Medium Access</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Can add, edit inventory items, view reports, but cannot delete items or manage users.
                  </p>
                </div>

                <div className="border-l-2 border-zinc-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <RoleBadge role="viewer" />
                    <span className="text-xs text-zinc-500">Basic Access</span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    View-only access to inventory. Cannot modify items or access administrative features.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
