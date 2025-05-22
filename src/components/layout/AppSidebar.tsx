
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Calendar, Trophy, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  { title: 'Events', url: '/events', icon: Calendar },
  { title: 'Leaderboard', url: '/leaderboard', icon: Trophy },
  { title: 'Profile', url: '/profile', icon: User },
];

export const AppSidebar = () => {
  const { user, logout } = useAuth();
  const { collapsed } = useSidebar();

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `w-full justify-start ${
      isActive 
        ? 'bg-ufc-red text-white shadow-lg' 
        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
    }`;

  return (
    <Sidebar className="border-r border-gray-800">
      <SidebarHeader className="border-b border-gray-800 p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-ufc-red to-red-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">UFC</span>
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-white">UFC Betting</h2>
              <p className="text-xs text-gray-400">Fight Night</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-800 p-4">
        {user && (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-ufc-red text-white text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user.points} points
                  </p>
                </div>
              )}
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
