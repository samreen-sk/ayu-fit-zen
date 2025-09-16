import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Database,
  Utensils,
  FileText,
  Settings,
  Bot,
  Leaf,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/",
  },
  {
    title: "Patients",
    icon: Users,
    url: "/patients",
  },
  {
    title: "Food Database",
    icon: Database,
    url: "/food-database",
  },
  {
    title: "Diet Generator",
    icon: Utensils,
    url: "/diet-generator",
  },
  {
    title: "Reports",
    icon: FileText,
    url: "/reports",
  },
  {
    title: "AI Assistant",
    icon: Bot,
    url: "/ai-assistant",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export function AppSidebar({ collapsed, onToggleCollapsed }: AppSidebarProps) {
  const location = useLocation();

  return (
    <div
      className={cn(
        "relative flex flex-col h-full bg-gradient-card border-r border-border shadow-ayurvedic transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-ayurveda flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-gradient">AyuFit</span>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapsed}
          className="hover:bg-secondary"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              className={cn(
                "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-gradient-ayurveda text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
                collapsed && "justify-center"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary-foreground")} />
              {!collapsed && (
                <span className="font-medium transition-colors">
                  {item.title}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground text-center">
            <p className="mb-1">AyuFit v1.0</p>
            <p>Ayurvedic Diet Platform</p>
          </div>
        )}
      </div>
    </div>
  );
}