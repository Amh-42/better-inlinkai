'use client';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    // This part should ideally be handled by middleware,
    // but a client-side redirect works as a fallback.
    router.push('/login');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      <div className="p-4 mt-4 border rounded bg-gray-50">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
      <button onClick={handleSignOut} className="mt-4 p-2 bg-red-500 text-white rounded">
        Sign Out
      </button>
    </div>
  );
}