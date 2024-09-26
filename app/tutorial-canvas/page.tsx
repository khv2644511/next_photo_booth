// @ts-nocheck
'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Canvas() {
  const canvasRef = useRef(null); // Reference for the canvas
  const picRef = useRef(null); // Reference for the picture
  const frameRef = useRef(null); // Reference for the frame

  useEffect(() => {
    function draw() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Draw frame
      ctx.drawImage(document.getElementById('frame'), 0, 0, 132, 150);
      // Draw slice
      // ctx.drawImage(document.getElementById('source'), 30, 30, 70, 90);
      // ctx.drawImage(document.getElementById('source'), 0, 0, 300, 227);
      ctx.drawImage(
        document.getElementById('source'),
        33,
        71,
        104,
        124,
        30,
        30,
        70,
        94,
      );
    }

    draw();
  }, []);

  return (
    <div className="flex flex-col mx-auto">
      <canvas id="canvas" ref={canvasRef}></canvas>
      <Image
        ref={picRef}
        id="source"
        src="https://mdn.github.io/shared-assets/images/examples/rhino.jpg"
        width="300"
        height="227"
        alt="image"
      />
      <Image
        ref={frameRef}
        id="frame"
        src="https://img.freepik.com/premium-photo/old-wooden-frame_1203-2205.jpg"
        width={132}
        height={150}
        alt="frame"
      />
    </div>
  );
}
