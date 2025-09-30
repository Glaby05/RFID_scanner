"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { UsersTable } from "@/components/dashboard/users-table"

export default function UsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
            <p className="text-zinc-400">Manage user accounts and permissions</p>
          </div>
          <UsersTable />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
