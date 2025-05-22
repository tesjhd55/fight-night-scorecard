
import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useIsMobile } from '@/hooks/use-mobile';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className={`w-full ${isMobile ? 'max-w-[90%]' : 'max-w-md'}`}>
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};
