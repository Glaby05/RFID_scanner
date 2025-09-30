import { type NextRequest, NextResponse } from "next/server"
import { query, queryOne } from "@/lib/db"
import type { Warehouse } from "@/lib/types"

// GET single warehouse
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const warehouse = await queryOne<Warehouse>(
      `
      SELECT w.*, e.name as owner_name 
      FROM warehouse w
      LEFT JOIN employee e ON w.owner_id = e.id
      WHERE w.id = ?
    `,
      [params.id],
    )

    if (!warehouse) {
      return NextResponse.json({ error: "Warehouse not found" }, { status: 404 })
    }

    return NextResponse.json({ warehouse })
  } catch (error) {
    console.error("Get warehouse error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// PUT update warehouse
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { name, location, owner_id } = await request.json()

    if (!name || !location) {
      return NextResponse.json({ error: "Name and location are required" }, { status: 400 })
    }

    await query("UPDATE warehouse SET name = ?, location = ?, owner_id = ? WHERE id = ?", [
      name,
      location,
      owner_id || null,
      params.id,
    ])

    const updatedWarehouse = await queryOne<Warehouse>(
      `
      SELECT w.*, e.name as owner_name 
      FROM warehouse w
      LEFT JOIN employee e ON w.owner_id = e.id
      WHERE w.id = ?
    `,
      [params.id],
    )

    return NextResponse.json({ success: true, warehouse: updatedWarehouse })
  } catch (error: any) {
    console.error("Update warehouse error:", error)

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Warehouse name already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// DELETE warehouse
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM warehouse WHERE id = ?", [params.id])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete warehouse error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
