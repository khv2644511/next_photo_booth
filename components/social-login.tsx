import Link from 'next/link';
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import { ImGithub } from 'react-icons/im';

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />

      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-2"
          href="/github/start"
        >
          <span className="">
            <ImGithub className="size-6" />
          </span>
          <span>Continue with Github</span>
        </Link>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-2"
          href="/sms"
        >
          <span className="">
            <ChatBubbleOvalLeftIcon className="size-6" />
          </span>
          <span>Continue with SMS</span>
        </Link>
      </div>
    </>
  );
}
