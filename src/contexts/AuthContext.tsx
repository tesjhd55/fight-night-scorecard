
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '@/types';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('ufc_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage (simple demo auth)
    const users = JSON.parse(localStorage.getItem('ufc_users') || '[]');
    const existingUser = users.find((u: User) => u.email === email);
    
    if (!existingUser) {
      throw new Error('User not found. Please register first.');
    }
    
    const loggedInUser = {
      ...existingUser,
      id: existingUser.id || Date.now().toString()
    };
    
    setUser(loggedInUser);
    localStorage.setItem('ufc_user', JSON.stringify(loggedInUser));
    setIsLoading(false);
    
    toast({
      title: "Welcome back!",
      description: `Good to see you again, ${loggedInUser.name}`,
    });
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('ufc_users') || '[]');
    const existingUser = users.find((u: User) => u.email === email);
    
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      points: 0,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('ufc_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('ufc_user', JSON.stringify(newUser));
    setIsLoading(false);
    
    toast({
      title: "Account created!",
      description: `Welcome to UFC Betting, ${name}!`,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ufc_user');
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const updateProfile = async (name: string, avatar?: string) => {
    if (!user) return;
    
    const updatedUser = { ...user, name, avatar };
    setUser(updatedUser);
    localStorage.setItem('ufc_user', JSON.stringify(updatedUser));
    
    // Update in users array
    const users = JSON.parse(localStorage.getItem('ufc_users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('ufc_users', JSON.stringify(users));
    }
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
