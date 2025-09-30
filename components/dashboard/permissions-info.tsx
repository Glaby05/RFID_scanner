"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { RoleBadge } from "@/components/auth/role-badge"

export function PermissionsInfo() {
  const { user } = useAuth()

  if (!user) return null

  const permissions = [
    {
      action: "View Inventory",
      viewer: true,
      manager: true,
      admin: true,
    },
    {
      action: "Add Items",
      viewer: false,
      manager: true,
      admin: true,
    },
    {
      action: "Edit Items",
      viewer: false,
      manager: true,
      admin: true,
    },
    {
      action: "Delete Items",
      viewer: false,
      manager: false,
      admin: true,
    },
    {
      action: "Manage Users",
      viewer: false,
      manager: false,
      admin: true,
    },
    {
      action: "View Reports",
      viewer: false,
      manager: true,
      admin: true,
    },
  ]

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Your Permissions</CardTitle>
            <CardDescription>Based on your role</CardDescription>
          </div>
          <RoleBadge role={user.role} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {permissions.map((permission) => {
            const hasPermission = permission[user.role]
            return (
              <div key={permission.action} className="flex items-center justify-between py-2">
                <span className="text-sm text-zinc-300">{permission.action}</span>
                {hasPermission ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <Check className="h-4 w-4" />
                    <span className="text-xs">Allowed</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-zinc-600">
                    <X className="h-4 w-4" />
                    <span className="text-xs">Restricted</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
