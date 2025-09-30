import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({ className, children, value, onChange, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      value={value}
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  );
}

export function SelectTrigger(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}

export function SelectContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}

export function SelectItem(props: React.OptionHTMLAttributes<HTMLOptionElement>) {
  return <option {...props} />;
}

export function SelectValue(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} />;
}
