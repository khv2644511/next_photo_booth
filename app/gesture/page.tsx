'use client';

import { useSpring, animated, config } from '@react-spring/web';
import { useDrag, useGesture } from '@use-gesture/react';
import Image from 'next/image';
import { url } from 'inspector';

export default function PullRelease() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Set the drag hook and define component movement based on gesture data
  const bind = useDrag(({ event, offset: [x, y] }) => {
    // event.preventDefault();
    api.start({ x, y });
  });

  // Bind it to a component
  return (
    // <div className="h-dvh">
    <animated.div
      className="bg-ship-img bg-contain z-50"
      {...bind()}
      style={{
        x,
        y,
        width: 150,
        height: 150,
        //   background: '#ff6d6d',
        borderRadius: 8,
        touchAction: 'none',
        //   backgroundRepeat: 'no-repeat',
        //   backgroundSize: 'contain',
        zIndex: 1000,
      }}
    />

    // </div>
  );
}
