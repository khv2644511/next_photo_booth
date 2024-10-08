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
import PullRelease from '../gesture/page';
import Drag from '@/components/drag';

export default function PhotoBooth() {
  const videoRef = useRef(null) as any;
  const [imageCapture, setImageCapture] = useState(null);
  const [isReady, setIsReady] = useState(false);
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

  const WebcamCapture = () => {
    return (
      <>
        <Webcam
          audio={false}
          height={240}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={320}
          videoConstraints={videoConstraints}
          style={{
            transform: 'rotate(0, 180deg)',
            '-webkit-transform': 'rotateY(180deg)', // Safari and Chrome
            '-moz-transform': 'rotateY(180deg)', // Firefox
          }}
        />
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col self-center justify-center pb-24">
        <div
          ref={container}
          className="container top-1/2 left-0 
          w-auto h-full bg-black mx-auto p-8 flex flex-col gap-10 z-20"
        >
          <div
            // after:content-[''] after:bg-flower-frame  after:absolute after:h-full after:w-full after:bg-contain after:top-0 after:rotate-180 after:z-0
            className="bg-red-100 canvas-container relative"
            style={{
              height: '240px',
              width: '320px',
            }}
          >
            {!url[0] && <WebcamCapture />}
            {/* <Drag props="panda-img" /> */}

            <img
              src={url[0]}
              alt="Screenshot"
              style={{
                height: '240px',
                width: '320px',
                transform: 'rotate(0, 180deg)',
                '-webkit-transform': 'rotateY(180deg)', // Safari and Chrome
                '-moz-transform': 'rotateY(180deg)', // Firefox
              }}
            />
          </div>
          <div
            // before:content-['나랑사진찍을래?ㅎ'] before:w-full before:text-black before:text-xl before:absolute before:left-4 before:top-4 before:z-50
            className="bg-red-100 canvas-container relative"
            // after:content-[''] after:bg-profile-frame  after:absolute after:h-2/3 after:w-2/3 after:bg-contain after:bg-no-repeat after:bottom-0 after:z-0 "
            style={{
              height: '240px',
              width: '320px',
            }}
          >
            {/* <Drag props="profile-frame" /> */}
            <Drag props="ship-img" />
            <Drag props="ship-img" />
            <Drag props="ship-img" />

            {!url[1] && url[0] && <WebcamCapture />}

            {url[1] && (
              <img
                src={url[1]}
                alt="Screenshot"
                style={{
                  height: '240px',
                  width: '320px',
                  transform: 'rotate(0, 180deg)',
                  '-webkit-transform': 'rotateY(180deg)', // Safari and Chrome
                  '-moz-transform': 'rotateY(180deg)', // Firefox
                }}
              />
            )}
          </div>
          <div
            className="bg-red-100 canvas-container relative"
            style={{ height: '240px', width: '320px' }}
          >
            {!url[2] && url[1] && <WebcamCapture />}
            {/* <Drag props="ship-img" /> */}

            {url[2] && (
              <img
                src={url[2]}
                alt="Screenshot"
                style={{
                  height: '240px',
                  width: '320px',
                  transform: 'rotate(0, 180deg)',
                  '-webkit-transform': 'rotateY(180deg)', // Safari and Chrome
                  '-moz-transform': 'rotateY(180deg)', // Firefox
                }}
              />
            )}
          </div>
          <div className="flex justify-center py-9 text-3xl">
            혜빈이의 인생세컷
          </div>
        </div>
        <div className="fixed z-50 bg-white bottom-0 py-5 w-full">
          <div className="flex gap-10 justify-center self-center">
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
            <button
              onClick={reset}
              className="min-w-32 bg-red-300 py-3 px-2 rounded-md"
            >
              다시찍기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
