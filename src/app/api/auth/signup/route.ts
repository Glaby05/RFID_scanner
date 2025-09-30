import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Validate role
    const validRoles = ["viewer", "admin", "manager"]
    const userRole = validRoles.includes(role) ? role : "viewer"

    // Hash password
    const password_hash = await bcrypt.hash(password, 10)

    // Insert new employee
    const result = await query("INSERT INTO employee (name, email, password_hash, role) VALUES (?, ?, ?, ?)", [
      name,
      email,
      password_hash,
      userRole,
    ])

    // Get the newly created employee
    const newEmployee = await query("SELECT id, name, email, role, created_at FROM employee WHERE email = ?", [email])

    return NextResponse.json({
      success: true,
      user: newEmployee[0],
    })
  } catch (error: any) {
    console.error("Signup error:", error)

    // Handle duplicate email error
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
