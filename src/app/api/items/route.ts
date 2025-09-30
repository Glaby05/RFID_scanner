import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { Warehouse } from "@/lib/types"

// GET all warehouses
export async function GET() {
  try {
    const warehouses = await query<Warehouse>(`
      SELECT w.*, e.name as owner_name 
      FROM warehouse w
      LEFT JOIN employee e ON w.owner_id = e.id
      ORDER BY w.created_at DESC
    `)

    return NextResponse.json({ warehouses })
  } catch (error) {
    console.error("Get warehouses error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// POST create new warehouse
export async function POST(request: NextRequest) {
  try {
    const { name, location, owner_id } = await request.json()

    if (!name || !location) {
      return NextResponse.json({ error: "Name and location are required" }, { status: 400 })
    }

    await query("INSERT INTO warehouse (name, location, owner_id) VALUES (?, ?, ?)", [name, location, owner_id || null])

    const newWarehouse = await query<Warehouse>(
      `
      SELECT w.*, e.name as owner_name 
      FROM warehouse w
      LEFT JOIN employee e ON w.owner_id = e.id
      WHERE w.name = ?
    `,
      [name],
    )

    return NextResponse.json({ success: true, warehouse: newWarehouse[0] })
  } catch (error: any) {
    console.error("Create warehouse error:", error)

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Warehouse name already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
