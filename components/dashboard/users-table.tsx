"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Pencil, Trash2, Shield } from "lucide-react"
import { AddUserDialog } from "./add-user-dialog"
import { EditUserDialog } from "./edit-user-dialog"
import { RoleBadge } from "@/components/auth/role-badge"
import type { UserRole } from "@/lib/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"

export interface UserData {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: string
  status: "active" | "inactive"
}

const initialUsers: UserData[] = [
  {
    id: "1",
    name: "John Admin",
    email: "john@example.com",
    role: "admin",
    createdAt: "2025-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Sarah Manager",
    email: "sarah@example.com",
    role: "manager",
    createdAt: "2025-02-10",
    status: "active",
  },
  {
    id: "3",
    name: "Mike Staff",
    email: "mike@example.com",
    role: "viewer",
    createdAt: "2025-03-05",
    status: "active",
  },
  {
    id: "4",
    name: "Emily Manager",
    email: "emily@example.com",
    role: "manager",
    createdAt: "2025-03-12",
    status: "active",
  },
  {
    id: "5",
    name: "David Staff",
    email: "david@example.com",
    role: "viewer",
    createdAt: "2025-03-20",
    status: "inactive",
  },
]

export function UsersTable() {
  const [users, setUsers] = useState<UserData[]>(initialUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddUser = (user: Omit<UserData, "id" | "createdAt">) => {
    const newUser: UserData = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setUsers([...users, newUser])
  }

  const handleEditUser = (updatedUser: UserData) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
  }

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    admins: users.filter((u) => u.role === "admin").length,
    managers: users.filter((u) => u.role === "manager").length,
    viewers: users.filter((u) => u.role === "viewer").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <p className="text-xs text-zinc-400">Total Users</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-500">{stats.active}</div>
            <p className="text-xs text-zinc-400">Active</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-500">{stats.admins}</div>
            <p className="text-xs text-zinc-400">Admins</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-500">{stats.managers}</div>
            <p className="text-xs text-zinc-400">Managers</p>
          </CardContent>
        </Card>
        <Card className="border-zinc-800 bg-zinc-950">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-zinc-400">{stats.viewers}</div>
            <p className="text-xs text-zinc-400">Viewers</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-zinc-800 bg-zinc-950">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">All Users</CardTitle>
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-white text-black hover:bg-zinc-200">
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
          <Alert className="mt-4 border-zinc-800 bg-zinc-900">
            <Shield className="h-4 w-4 text-purple-500" />
            <AlertDescription className="text-zinc-400">
              Admin access required. You can manage all user accounts and assign roles.
            </AlertDescription>
          </Alert>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="pb-3 text-left text-sm font-medium text-zinc-400">Name</th>
                  <th className="pb-3 text-left text-sm font-medium text-zinc-400">Email</th>
                  <th className="pb-3 text-left text-sm font-medium text-zinc-400">Role</th>
                  <th className="pb-3 text-left text-sm font-medium text-zinc-400">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-zinc-400">Created</th>
                  <th className="pb-3 text-right text-sm font-medium text-zinc-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-zinc-800">
                    <td className="py-4 text-sm text-white">{user.name}</td>
                    <td className="py-4 text-sm text-zinc-400">{user.email}</td>
                    <td className="py-4">
                      <RoleBadge role={user.role} />
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        className={`text-xs px-2 py-1 rounded ${
                          user.status === "active" ? "bg-green-500/10 text-green-500" : "bg-zinc-700/50 text-zinc-500"
                        }`}
                      >
                        {user.status}
                      </button>
                    </td>
                    <td className="py-4 text-sm text-zinc-400">{user.createdAt}</td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingUser(user)}
                          className="text-zinc-400 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-zinc-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="py-8 text-center text-zinc-400">No users found matching your search.</div>
            )}
          </div>
        </CardContent>
      </Card>

      <AddUserDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddUser} />

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onOpenChange={(open) => !open && setEditingUser(null)}
          onEdit={handleEditUser}
        />
      )}
    </div>
  )
}
