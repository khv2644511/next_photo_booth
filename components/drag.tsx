'use client';

import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Drag(props: any) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ event, offset: [x, y] }) => {
    api.start({ x, y });
  });

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        y,
        touchAction: 'none',
      }}
    >
      {props.children}
    </animated.div>
  );
}
