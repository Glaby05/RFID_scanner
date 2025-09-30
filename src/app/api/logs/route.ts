import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import type { InventoryLog } from "@/lib/types"

// GET inventory logs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const warehouseId = searchParams.get("warehouse_id")
    const itemId = searchParams.get("item_id")
    const limit = searchParams.get("limit") || "50"

    let sql = `
      SELECT 
        l.*,
        i.name as item_name,
        w.name as warehouse_name,
        e.name as employee_name
      FROM inventory_logs l
      LEFT JOIN item i ON l.item_id = i.id
      LEFT JOIN warehouse w ON l.warehouse_id = w.id
      LEFT JOIN employee e ON l.employee_id = e.id
      WHERE 1=1
    `
    const params: any[] = []

    if (warehouseId) {
      sql += " AND l.warehouse_id = ?"
      params.push(warehouseId)
    }

    if (itemId) {
      sql += " AND l.item_id = ?"
      params.push(itemId)
    }

    sql += " ORDER BY l.created_at DESC LIMIT ?"
    params.push(Number.parseInt(limit))

    const logs = await query<InventoryLog>(sql, params)

    return NextResponse.json({ logs })
  } catch (error) {
    console.error("Get logs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
