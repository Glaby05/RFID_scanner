export interface Employee {
  id: number
  name: string
  email: string
  role: "viewer" | "admin" | "manager"
  created_at: Date
}

export interface Warehouse {
  id: number
  name: string
  location: string
  owner_id: number | null
  owner_name?: string
  created_at: Date
}

export interface Item {
  id: number
  name: string
  description: string | null
  rfid_tag: string
  warehouse_id: number | null
  warehouse_name?: string
  created_at: Date
}

export interface InventoryLog {
  id: number
  warehouse_id: number | null
  item_id: number
  employee_id: number | null
  action: "added" | "removed" | "moved"
  quantity: number
  created_at: Date
  item_name?: string
  warehouse_name?: string
  employee_name?: string
}
