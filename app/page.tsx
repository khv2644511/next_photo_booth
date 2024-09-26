import Link from 'next/link';
import './lib/db';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium *:text-black">
        <span className="text-9xl">🥕🥕🥕</span>
        <h1 className="text-4xl">Hi</h1>
        <h2 className="text-2xl">Welcome to hyeppy's photo booth 😊;</h2>
        <h2 className="text-2xl">Do you want to take photo with me? 📸;</h2>
      </div>

      <div className="flex flex-col items-center gap-3 w-full *:text-black">
        {/* <Link href="/create-account" className="primary-btn py-2.5 text-lg">
          시작하기
        </Link> */}
        <Link href="/photo-booth" className="primary-btn py-2.5 text-lg">
          시작하기
        </Link>
        {/* <div className="flex gap-2">
          <span>이미 계정이 있나요?</span>
          <Link href="/login" className="hover:underline">
            로그인
          </Link>
        </div> */}
      </div>
    </div>
  );
}
