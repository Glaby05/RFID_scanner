import { Badge } from "@/components/ui/badge"
import type { UserRole } from "@/lib/auth-context"
import { Shield, Users, User } from "lucide-react"

interface RoleBadgeProps {
  role: UserRole
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const roleConfig = {
    admin: {
      label: "Admin",
      icon: Shield,
      className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    },
    manager: {
      label: "Manager",
      icon: Users,
      className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    },
    staff: {
      label: "Viewer",
      icon: User,
      className: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    },
  }

  const config = roleConfig[role as keyof typeof roleConfig]
  const Icon = config.icon

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="mr-1 h-3 w-3" />
      {config.label}
    </Badge>
  )
}
