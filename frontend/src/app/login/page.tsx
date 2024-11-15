'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../actions'

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/products')
    }
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      router.push('/products');
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col items-center max-w-md mx-auto p-4 border rounded-2xl shadow-md bg-gray-300">
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <button type="submit" className="px-8 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
        Login
      </button>
    </form>
  );
};

export default Login;