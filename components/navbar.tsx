'use client'; // Make sure this is at the top

import React from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="w-full h-20 bg-white *:text-lg *:text-black flex justify-center gap-10 px-10 *:px-6">
      <button onClick={() => router.push('/')}>홈</button>
      <button onClick={() => router.push('/prismatest')}>
        프리즈마 테스트
      </button>
    </div>
  );
}
