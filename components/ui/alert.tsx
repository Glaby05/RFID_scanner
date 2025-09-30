import * as React from "react";
import { cn } from "@/lib/utils";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "warning" | "success";
}

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  const baseClasses =
    "rounded-md border p-4 text-sm font-medium flex items-start gap-2";

  const variantClasses = {
    default: "bg-primary/10 border-primary text-primary-foreground",
    destructive: "bg-destructive/10 border-destructive text-destructive-foreground",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-900",
    success: "bg-green-100 border-green-400 text-green-900",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} {...props} />
  );
}

export function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm opacity-90", className)} {...props} />;
}
