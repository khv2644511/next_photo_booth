'use client';

import Calendar from '@/components/calendar';
import { Button } from '@nextui-org/react';

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <Calendar />
    </div>
  );
}
