// @ts-nocheck
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import ShipImage from '@/app/assets/ship.png';
import FlowerFrame from '@/app/assets/flowerFrame.png';
import Profile from '@/app/assets/profile.png';
import html2canvas from 'html2canvas';
import React from 'react';
import Webcam from 'react-webcam';

export default function PhotoBooth() {
  const videoRef = useRef(null) as any; // Reference to the video element
  const [inputValue, setInputValue] = useState(0); // State to handle the range input
  const [imageCapture, setImageCapture] = useState(null); // State to store imageCapture instance
  const [isReady, setIsReady] = useState(false); // State to track if imageCapture is ready
  const [capturedImg, setCapturedImg] = useState([]);
  const [count, setCount] = useState(1);
  const container = useRef(null);
  const [url, setUrl] = useState([]);

  const reset = () => {
    setUrl([]);
  };

  const dowonload = () => {
    var divToCapture = container.current;

    // Use html2canvas to capture the div as an image
    html2canvas(divToCapture, {
      useCORS: true, // Ensures cross-origin images load correctly
      //   width: divToCapture.offsetWidth, // Use container's full width
      //   height: divToCapture.offsetHeight, // Use container's full height
      scrollX: 0, // Prevents capturing any scrolled positions
      scrollY: 0, // Prevents capturing any scrolled positions
    }).then(function (canvas) {
      //   document.body.appendChild(canvas);

      // Convert the canvas to a data URL
      var imageData = canvas.toDataURL('image/jpeg');

      // Create a link element and trigger a download
      var link = document.createElement('a');
      link.href = imageData;
      link.download = 'output.jpg';
      link.click();
    });
  };

  const videoConstraints = {
    width: 320,
    height: 240,
    facingMode: 'user',
  };

  const WebcamCapture = () => {
    const webcamRef = useRef(null);
    const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (url.length > 2) {
        return;
      }
      if (imageSrc) {
        setUrl((prevUrls) => [...prevUrls, imageSrc]); // Append the new image to the array
      }
    }, [webcamRef]);

    // console.log(url);
    return (
      <>
        <Webcam
          audio={false}
          height={240}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          videoConstraints={videoConstraints}
        />
        <div className="flex gap-10 justify-center my-5">
          <button
            className="min-w-32 bg-red-300 py-3 px-2 rounded-md"
            onClick={capture}
          >
            Capture photo
          </button>
          <button
            className="min-w-32 bg-red-300 py-3 px-2 rounded-md"
            onClick={dowonload}
          >
            dowonload
          </button>
        </div>
        <div className="m-auto">
          <button
            onClick={reset}
            className="mb-3 bg-red-300 py-3 px-2 rounded-md"
          >
            다시찍기
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col self-center justify-center">
      {/* <div className="w-full h-20 bg-black fixed bottom-0"></div> */}
      <div className="w-80 flex flex-col justify-center self-center ml-10 mt-20">
        <WebcamCapture />
      </div>

      <div
        ref={container}
        className="container top-1/2 left-0 
        w-auto h-full bg-black mx-auto p-8 flex flex-col gap-10 overflow-hidden z-20"
      >
        <div
          className="bg-red-100 canvas-container relative after:content-[''] after:bg-flower-frame  after:absolute after:h-full after:w-full after:bg-contain after:top-0 after:rotate-180 after:z-0"
          style={{
            height: '320px',
            width: '320px',
          }}
        >
          <img
            src={url[0]}
            alt="Screenshot"
            style={{
              height: '320px',
              width: '320px',
            }}
          />

          {/* <canvas id="canvas1" width={320} height={228}></canvas> */}
        </div>
        <div
          className="bg-red-100 canvas-container relative after:content-[''] after:bg-profile-frame  after:absolute after:h-2/3 after:w-2/3 after:bg-contain after:bg-no-repeat after:bottom-0 after:z-0 before:content-['나랑사진찍을래?ㅎ'] before:w-full before:text-black before:text-xl before:absolute before:left-4 before:top-4 before:z-50"
          style={{ height: '320px', width: '320px' }}
        >
          {url[1] && (
            <img
              src={url[1]}
              alt="Screenshot"
              style={{
                height: '320px',
                width: '320px',
              }}
              // style={{
              //   backgroundImage: `url(${url[1]})`,
              //   height: '320px',
              //   width: '320px',
              //   backgroundSize: 'cover',
              // }}
            />
          )}

          {/* <canvas id="canvas2" width={320} height={228}></canvas> */}
        </div>
        <div
          className="bg-red-100 canvas-container relative"
          style={{ height: '320px', width: '320px' }}
        >
          <Image
            src={ShipImage}
            width={150}
            alt="ship"
            className="absolute -bottom-20 -right-6"
          />
          {url[2] && (
            <img
              src={url[2]}
              alt="Screenshot"
              style={{
                height: '320px',
                width: '320px',
              }}
            />
          )}

          {/* <canvas id="canvas3" width={320} height={228}></canvas> */}
        </div>
        <div className="flex justify-center py-9 text-3xl">
          혜빈이의 인생세컷
        </div>
      </div>
    </div>
  );
}
