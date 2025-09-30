"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { InventoryTable } from "@/components/dashboard/inventory-table"
import { StatsCards } from "@/components/dashboard/stats-cards"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Inventory Dashboard</h1>
            <p className="text-zinc-400">Manage and track your inventory items</p>
          </div>
          <StatsCards />
          <InventoryTable />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
