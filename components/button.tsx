'use client';

import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  // loading: boolean; <- useFormStatus()로 대체
  text: string;
}

export default function Button({ loading, text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? 'Loaing...' : text}
    </button>
  );
}
