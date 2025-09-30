export type UserRole = "viewer" | "manager" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

export interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  price: number
  status: "in-stock" | "low-stock" | "out-of-stock"
  created_at: string
  updated_at: string
}

export interface Warehouse {
  id: string
  name: string
  location: string
  capacity: number
  manager_id: string
  created_at: string
  updated_at: string
}

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Request failed" }))
      throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`)
    }
    return response.json()
  }

  // Inventory API
  async getInventoryItems(): Promise<InventoryItem[]> {
    const response = await fetch("/api/inventory", {
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse<InventoryItem[]>(response)
  }

  async getInventoryItem(id: string): Promise<InventoryItem> {
    const response = await fetch(`/api/inventory/${id}`, {
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse<InventoryItem>(response)
  }

  async createInventoryItem(
    item: Omit<InventoryItem, "id" | "status" | "created_at" | "updated_at">,
  ): Promise<InventoryItem> {
    const response = await fetch("/api/inventory", {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(item),
    })
    return this.handleResponse<InventoryItem>(response)
  }

  async updateInventoryItem(id: string, item: Partial<InventoryItem>): Promise<InventoryItem> {
    const response = await fetch(`/api/inventory/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(item),
    })
    return this.handleResponse<InventoryItem>(response)
  }

  async deleteInventoryItem(id: string): Promise<void> {
    const response = await fetch(`/api/inventory/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    })
    await this.handleResponse<void>(response)
  }

  // Warehouse API
  async getWarehouses(): Promise<Warehouse[]> {
    const response = await fetch("/api/warehouses", {
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse<Warehouse[]>(response)
  }

  async getWarehouse(id: string): Promise<Warehouse> {
    const response = await fetch(`/api/warehouses/${id}`, {
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse<Warehouse>(response)
  }

  async createWarehouse(warehouse: Omit<Warehouse, "id" | "created_at" | "updated_at">): Promise<Warehouse> {
    const response = await fetch("/api/warehouses", {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(warehouse),
    })
    return this.handleResponse<Warehouse>(response)
  }

  async updateWarehouse(id: string, warehouse: Partial<Warehouse>): Promise<Warehouse> {
    const response = await fetch(`/api/warehouses/${id}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(warehouse),
    })
    return this.handleResponse<Warehouse>(response)
  }

  async deleteWarehouse(id: string): Promise<void> {
    const response = await fetch(`/api/warehouses/${id}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    })
    await this.handleResponse<void>(response)
  }
}

export const api = new ApiClient()
