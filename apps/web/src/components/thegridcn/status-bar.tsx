"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface StatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
  variant?: "default" | "alert" | "info"
}

export function StatusBar({
  leftContent,
  rightContent,
  variant = "default",
  className,
  ...props
}: StatusBarProps) {
  const variantStyles = {
    default: "bg-muted/50 border-border",
    alert: "bg-red-500/10 border-red-500/50",
    info: "bg-cyan-500/10 border-cyan-500/50",
  }

  return (
    <div
      data-slot="tron-status-bar"
      data-variant={variant}
      className={cn(
        "flex items-center justify-between border-y px-4 py-2 font-mono text-xs uppercase tracking-widest",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4 text-foreground/80">
        {leftContent}
      </div>
      <div className="flex items-center gap-4 text-foreground/80">
        {rightContent}
      </div>
    </div>
  )
}

interface InfoPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  timestamp?: string
  status?: "active" | "pending" | "complete"
}

export function InfoPanel({
  title,
  subtitle,
  timestamp,
  status = "active",
  children,
  className,
  ...props
}: InfoPanelProps) {
  const statusIndicator = {
    active: "bg-green-500",
    pending: "bg-amber-500 animate-pulse",
    complete: "bg-cyan-500",
  }

  return (
    <div
      data-slot="tron-info-panel"
      className={cn(
        "relative overflow-hidden rounded border border-border/50 bg-card/50 backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-border/50 bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-3">
          <div className={cn("h-2 w-2 rounded-full", statusIndicator[status])} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/80">
            {subtitle}
          </span>
        </div>
        {timestamp && (
          <span className="font-mono text-[10px] text-foreground/80">
            {timestamp}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="mb-2 font-mono text-lg font-bold uppercase tracking-wider text-foreground">
          {title}
        </h3>
        {children}
      </div>

      <div className="pointer-events-none absolute right-2 top-2 grid grid-cols-3 gap-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-1 w-1 rounded-full bg-primary/20"
          />
        ))}
      </div>
    </div>
  )
}
