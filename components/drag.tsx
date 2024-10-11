'use client';

import { useSpring, animated, useTransition } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

export default function Drag(props: any) {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  const bind = useDrag(({ event, offset: [x, y] }) => {
    api.start({ x, y });
  });

  const data = [1];
  const transitions = useTransition(data, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  });

  return transitions((style, item) => (
    <animated.div
      className={`bg-contain z-100 absolute`}
      {...bind()}
      style={{
        x,
        y,
        width: '100px',
        height: '100px',
        borderRadius: 8,
        touchAction: 'none',
        zIndex: 1000,
        top: `${props.top}px`,
        left: `${props.left}px`,
        background: `url(${props.props})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        ...style,
      }}
    />
  ));
}

function MyComponent({ data = [1, 2, 3] }) {
  const transitions = useTransition(data, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 1 },
  });

  return transitions((style, item) => (
    <animated.div style={style}>{item}</animated.div>
  ));
}
