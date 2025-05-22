
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b border-gray-800 px-4 bg-black/50 backdrop-blur-sm">
            <SidebarTrigger className="text-white hover:bg-gray-800" />
            <div className="ml-4">
              <h1 className="text-lg font-semibold text-white">Fight Night</h1>
            </div>
          </header>
          <div className="flex-1 p-4 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
