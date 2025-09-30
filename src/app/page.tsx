import Image from "next/image";
import { getUsers } from "../../lib/db-demo";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Shield, Users, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6" />
            <span className="text-xl font-bold">InventoryPro</span>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="text-zinc-400 hover:text-white">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="bg-white text-black hover:bg-zinc-200">
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Manage Your Inventory
          <br />
          <span className="text-zinc-400">With Confidence</span>
        </h1>
        <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto text-pretty">
          A powerful inventory management system with role-based access control, real-time tracking, and comprehensive
          reporting.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-black hover:bg-zinc-200">
            <Link href="/signup">Start Free Trial</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-zinc-700 text-white hover:bg-zinc-900 bg-transparent"
          >
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <div className="h-12 w-12 rounded-lg bg-zinc-900 flex items-center justify-center mb-4">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Inventory Tracking</h3>
            <p className="text-zinc-400 text-sm">
              Track stock levels, locations, and movements in real-time with detailed history.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <div className="h-12 w-12 rounded-lg bg-zinc-900 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
            <p className="text-zinc-400 text-sm">
              Control permissions with admin, manager, and staff roles for secure operations.
            </p>
          </div>

          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <div className="h-12 w-12 rounded-lg bg-zinc-900 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Team Collaboration</h3>
            <p className="text-zinc-400 text-sm">Work together seamlessly with your team across multiple locations.</p>
          </div>

          <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-950">
            <div className="h-12 w-12 rounded-lg bg-zinc-900 flex items-center justify-center mb-4">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Analytics & Reports</h3>
            <p className="text-zinc-400 text-sm">Get insights with comprehensive reports and analytics dashboards.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-zinc-500 text-sm">
          <p>© 2025 InventoryPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
