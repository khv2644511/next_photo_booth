'use client';

import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Drag(props: any) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ event, offset: [x, y] }) => {
    api.start({ x, y });
  });

  console.log(props.props);
  return (
    <animated.div
      className={`bg-${props.props} w-5 h-5 bg-contain z-100 absolute`}
      {...bind()}
      style={{
        x,
        y,
        width: 150,
        height: 150,
        borderRadius: 8,
        touchAction: 'none',
        zIndex: 1000,
      }}
    />
  );
}
