"use client"

import { useEffect, useState } from "react"
import { Package, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { api } from "@/lib/api"

export function StatsCards() {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalValue: 0,
    lowStock: 0,
    thisMonth: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      const items = await api.getInventoryItems()

      // Calculate stats from items
      const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
      const totalValue = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
      const lowStock = items.filter((item) => item.status === "low-stock" || item.status === "out-of-stock").length

      setStats({
        totalItems,
        totalValue,
        lowStock,
        thisMonth: items.length, // Using total items as a placeholder for "this month"
      })
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const statsData = [
    {
      title: "Total Items",
      value: isLoading ? "..." : stats.totalItems.toLocaleString(),
      change: "+12%",
      icon: Package,
      trend: "up" as const,
    },
    {
      title: "Total Value",
      value: isLoading
        ? "..."
        : `$${stats.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: "+8%",
      icon: DollarSign,
      trend: "up" as const,
    },
    {
      title: "Low Stock",
      value: isLoading ? "..." : stats.lowStock.toString(),
      change: "-5%",
      icon: AlertTriangle,
      trend: "down" as const,
    },
    {
      title: "This Month",
      value: isLoading ? "..." : `+${stats.thisMonth}`,
      change: "+23%",
      icon: TrendingUp,
      trend: "up" as const,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <Card key={stat.title} className="border-zinc-800 bg-zinc-950">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-zinc-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
              {stat.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
