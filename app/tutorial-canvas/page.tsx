// 'use client';

// import { useEffect } from 'react';

// export default function Canvas() {
//   useEffect(() => {
//     function draw() {
//       var canvas = document.querySelector('canvas');
//       if (canvas.getContext) {
//         var ctx = canvas.getContext('2d');
//         for (var i = 0; i <= 4; i++) {
//           for (var j = 0; j <= 3; j++) {
//             ctx.beginPath();
//             var x = 25 + j * 50; // x coordinate
//             var y = 25 + i * 50; // y coordinate
//             var radius = 20; // Arc radius
//             var startAngle = 0; // Starting point on circle
//             var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
//             var anticlockwise = i % 2 == 0 ? false : true; // clockwise or anticlockwise

//             ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

//             if (i > 1) {
//               ctx.fill();
//             } else {
//               ctx.stroke();
//             }
//           }
//         }
//       }
//     }
//     draw();
//   }, []);
//   return (
//     <div className="flex flex-col gap-10 py-8 px-6">
//       {/* <canvas></canvas> */}
//       <canvas id="my-house" width="300" height="300"></canvas>
//       {/* <canvas id="canvas" width="150" height="150"></canvas> */}
//     </div>
//   );
// }
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
