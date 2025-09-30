import { type NextRequest, NextResponse } from "next/server"
import { queryOne } from "@/lib/db"
import type { Employee } from "@/lib/types"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find employee by email
    const employee = await queryOne<Employee>("SELECT * FROM employee WHERE email = ?", [email])

    if (!employee) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, (employee as any).password_hash)

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Remove password_hash from response
    const { password_hash, ...employeeData } = employee as any

    return NextResponse.json({
      success: true,
      user: employeeData,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
