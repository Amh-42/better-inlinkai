'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/dashboard',
    });
    if (error) alert(error.message);
  };

  const handleLinkedInSignIn = async () => {
    await authClient.signIn.social({
      provider: 'linkedin',
      callbackURL: '/dashboard',
    });
  };
  
  const handlePasskeySignIn = async () => {
    const { error } = await authClient.signIn.passkey();
    if (error) {
      alert(error.message);
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4 p-4 border rounded">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Sign In with Email
        </button>
      </form>

      <div className="mt-4">
        <button onClick={handleLinkedInSignIn} className="p-2 bg-sky-600 text-white rounded">
          Sign In with LinkedIn
        </button>
      </div>

       <div className="mt-4">
        <button onClick={handlePasskeySignIn} className="p-2 bg-gray-700 text-white rounded">
          Sign In with Passkey
        </button>
      </div>
    </div>
  );
}