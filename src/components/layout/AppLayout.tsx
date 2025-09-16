import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background pattern-organic">
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <AppSidebar 
          collapsed={sidebarCollapsed} 
          onToggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppHeader />
          
          {/* Page content */}
          <main className="flex-1 overflow-y-auto bg-background/80 backdrop-blur-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}