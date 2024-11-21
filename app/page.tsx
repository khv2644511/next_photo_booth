'use client';

// import Link from 'next/link';
// import './lib/db';
// import Image from 'next/image';
import { CirculateApp } from './utils/circulate';
import { useEffect } from 'react';

export default function Home() {
  // const res = await fetch('http://localhost:3000/api/users');
  // const data = await res.json();

  // console.log(data);

  useEffect(() => {
    new CirculateApp();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 w-full h-dvh">
      <canvas className="w-full h-full" id="circulate_canvas"></canvas>
      {/* <div className="flex flex-col items-center gap-3 w-full *:text-black"> */}
      {/* <Link href="/photo-booth" className="primary-btn py-2.5 text-lg">
          로그인 없이 사진 촬영 시작하기
        </Link>
        <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div> */}
      {/* </div> */}
    </div>
  );
}
