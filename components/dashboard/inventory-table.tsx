"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Pencil, Trash2, AlertCircle } from "lucide-react"
import { AddItemDialog } from "./add-item-dialog"
import { EditItemDialog } from "./edit-item-dialog"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { api, type InventoryItem } from "@/lib/api"

export function InventoryTable() {
  const { user, hasPermission } = useAuth()
  const [items, setItems] = useState<InventoryItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const canEdit = hasPermission("manager")
  const canDelete = hasPermission("admin")

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setIsLoading(true)
      setError("")
      const data = await api.getInventoryItems()
      setItems(data)
    } catch (error) {
      console.error("Failed to fetch items:", error)
      setError("Failed to load inventory items. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleAddItem = async (item: Omit<InventoryItem, "id" | "status" | "created_at" | "updated_at">) => {
    const newItem = await api.createInventoryItem(item)
    setItems([...items, newItem])
  }

  const handleEditItem = async (updatedItem: InventoryItem) => {
    await api.updateInventoryItem(updatedItem.id, updatedItem)
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
  }

  const handleDeleteItem = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await api.deleteInventoryItem(id)
        setItems(items.filter((item) => item.id !== id))
      } catch (error) {
        console.error("Failed to delete item:", error)
        alert("Failed to delete item. Please try again.")
      }
    }
  }

  const getStatusBadge = (status: InventoryItem["status"]) => {
    const variants = {
      "in-stock": "bg-green-500/10 text-green-500 border-green-500/20",
      "low-stock": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      "out-of-stock": "bg-red-500/10 text-red-500 border-red-500/20",
    }
    return (
      <Badge variant="outline" className={variants[status]}>
        {status.replace("-", " ")}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="py-8">
          <div className="text-center text-zinc-400">Loading inventory...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-zinc-800 bg-zinc-950">
        <CardContent className="py-8">
          <Alert className="border-red-500/50 bg-red-500/10">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-500">{error}</AlertDescription>
          </Alert>
          <Button onClick={fetchItems} className="mt-4 bg-white text-black hover:bg-zinc-200">
            Retry
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Inventory Items</CardTitle>
          {canEdit && (
            <Button onClick={() => setIsAddDialogOpen(true)} className="bg-white text-black hover:bg-zinc-200">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          )}
        </div>
        {user?.role === "staff" && (
          <Alert className="mt-4 border-zinc-800 bg-zinc-900">
            <AlertCircle className="h-4 w-4 text-zinc-400" />
            <AlertDescription className="text-zinc-400">
              You have view-only access. Contact a manager or admin to modify inventory items.
            </AlertDescription>
          </Alert>
        )}
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search items..."
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
                <th className="pb-3 text-left text-sm font-medium text-zinc-400">SKU</th>
                <th className="pb-3 text-left text-sm font-medium text-zinc-400">Category</th>
                <th className="pb-3 text-left text-sm font-medium text-zinc-400">Quantity</th>
                <th className="pb-3 text-left text-sm font-medium text-zinc-400">Price</th>
                <th className="pb-3 text-left text-sm font-medium text-zinc-400">Status</th>
                {(canEdit || canDelete) && (
                  <th className="pb-3 text-right text-sm font-medium text-zinc-400">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-b border-zinc-800">
                  <td className="py-4 text-sm text-white">{item.name}</td>
                  <td className="py-4 text-sm text-zinc-400">{item.sku}</td>
                  <td className="py-4 text-sm text-zinc-400">{item.category}</td>
                  <td className="py-4 text-sm text-white">{item.quantity}</td>
                  <td className="py-4 text-sm text-white">${item.price.toFixed(2)}</td>
                  <td className="py-4">{getStatusBadge(item.status)}</td>
                  {(canEdit || canDelete) && (
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {canEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingItem(item)}
                            className="text-zinc-400 hover:text-white"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                        {canDelete && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-zinc-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {filteredItems.length === 0 && (
            <div className="py-8 text-center text-zinc-400">No items found matching your search.</div>
          )}
        </div>
      </CardContent>

      <AddItemDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={handleAddItem} />

      {editingItem && (
        <EditItemDialog
          item={editingItem}
          open={!!editingItem}
          onOpenChange={(open) => !open && setEditingItem(null)}
          onEdit={handleEditItem}
        />
      )}
    </Card>
  )
}
