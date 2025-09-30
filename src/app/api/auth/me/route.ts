import { type NextRequest, NextResponse } from "next/server"
import { queryOne } from "@/lib/db"
import type { Employee } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    // In a real app, you'd get the user ID from a session/JWT token
    // For now, we'll use a query parameter
    const userId = request.nextUrl.searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const employee = await queryOne<Employee>("SELECT id, name, email, role, created_at FROM employee WHERE id = ?", [
      userId,
    ])

    if (!employee) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: employee })
  } catch (error) {
    console.error("Get user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
