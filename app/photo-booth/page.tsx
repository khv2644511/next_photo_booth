'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import ShipImage from '@/app/assets/ship.png';

export default function PhotoBooth() {
  const videoRef = useRef(null); // Reference to the video element
  const [inputValue, setInputValue] = useState(0); // State to handle the range input
  const [imageCapture, setImageCapture] = useState(null); // State to store imageCapture instance
  const [isReady, setIsReady] = useState(false); // State to track if imageCapture is ready
  const [capturedImg, setCapturedImg] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    // Access the video stream and set srcObject to the video element
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream; // Set the video source to the media stream
          videoRef.current.play(); // Play the video
        }

        const track = mediaStream.getVideoTracks()[0];
        const newImageCapture = new ImageCapture(track); // Create new ImageCapture instance
        setImageCapture(newImageCapture); // Store the ImageCapture instance

        return newImageCapture.getPhotoCapabilities();
      })
      .then((photoCapabilities) => {
        setInputValue(photoCapabilities.imageWidth.min);
        document.querySelector('input[type="range"]').min =
          photoCapabilities.imageWidth.min;
        document.querySelector('input[type="range"]').max =
          photoCapabilities.imageWidth.max;
        document.querySelector('input[type="range"]').step =
          photoCapabilities.imageWidth.step;
        setIsReady(true); // Enable the button when ready
      })
      .catch((error) => console.log('Error:', error.name || error));
  }, []);

  function onTakePhotoButtonClick() {
    if (imageCapture && isReady) {
      imageCapture
        .takePhoto({ imageWidth: inputValue })
        .then((blob) => createImageBitmap(blob))
        .then((imageBitmap) => {
          if (count >= 4) {
            return;
          }
          drawCanvas(imageBitmap);
          setCount((prev) => prev + 1);

          setCapturedImg((prev) => [...prev, imageBitmap]); // Store the captured image
          console.log(
            `Photo size is ${imageBitmap.width}x${imageBitmap.height}`,
          );
        })
        .catch((error) => console.log(error));
    } else {
      console.log('ImageCapture not ready');
    }
  }

  function handleRangeChange(e) {
    console.log('e', e);
    setInputValue(e.target.value); // Update the input value when range slider changes
  }

  //   useEffect(() => {
  //     capturedImg.forEach((img, index) => {
  //       console.log(img);
  //       const newCanvas = document.createElement('canvas');
  //       const container = document.querySelector('.canvas-container');
  //       newCanvas.width = 300; // Set canvas width (adjust as needed)
  //       newCanvas.height = 300; // Set canvas height (adjust as needed)
  //       container.appendChild(newCanvas); // Add the new canvas to the container
  //       const ctx = newCanvas.getContext('2d');

  //       let ratio = Math.min(
  //         newCanvas.width / img.width,
  //         newCanvas.height / img.height,
  //       );
  //       let x = (newCanvas.width - img.width * ratio) / 2;
  //       let y = (newCanvas.height - img.height * ratio) / 2;
  //       ctx.clearRect(0, 0, newCanvas.width, newCanvas.height); // Clear the canvas before drawing
  //       ctx.drawImage(
  //         img,
  //         0,
  //         0,
  //         img.width,
  //         img.height,
  //         x,
  //         y,
  //         img.width * ratio,
  //         img.height * ratio,
  //       );
  //     });
  //   }, [capturedImg]);

  //   useEffect(() => {
  //     console.log(capturedImg);
  //   }, [capturedImg]);
  /* Utils */
  function drawCanvas(img) {
    // setCapturedImg((prev) => [...prev, img]);
    console.log(img);
    // const container = document.querySelector('.canvas-container');
    const canvas = document.getElementById(`canvas${count}`);
    // const container = document.querySelector('.canvas-container');
    // const container = document.querySelector('.canvas-container');

    // const canvas = document.createElement('canvas');
    // const canvas = document.createElement('div');

    // container.appendChild(canvas); // Add the new canvas to the container

    // canvas.width = getComputedStyle(canvas).width.split('px')[0];
    // canvas.height = getComputedStyle(canvas).height.split('px')[0];
    canvas.width = 256;
    canvas.height = 160;
    let ratio = Math.min(img.width / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    console.log('x', x, 'y', y);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext('2d').drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      256,
      160,
      //   img.width * ratio,
      //   img.height * ratio,
    );
  }

  return (
    <div className="flex py-8 px-6">
      <div className="w-80 flex flex-col justify-center self-center">
        <input
          style={{ display: 'none' }}
          type="range"
          value={inputValue}
          onChange={handleRangeChange} // Handle the range change
        />
        <video ref={videoRef} style={{ width: '100%', height: 'auto' }} />
        {/* Video element */}
        <Button
          onClick={onTakePhotoButtonClick}
          disabled={!isReady}
          className="bg-pink-400 my-5 text-white text-lg font-semibold font-mono w-1/2 mx-auto"
        >
          사진촬영
        </Button>
      </div>
      <div className=" w-80 h-4/5 bg-black mx-auto absolute left-1/3 p-8 flex flex-col gap-10">
        {/* <div className="flex justify-center text-2xl font-bold -my-2.5 text-pink-500">
          혜빈이의 인생네컷
        </div> */}
        <div className="w-full h-40 bg-red-100 canvas-container">
          <canvas id="canvas1"></canvas>
        </div>
        <div className="w-full h-40 bg-red-100 canvas-container">
          <canvas id="canvas2"></canvas>
        </div>
        <div className="w-full h-40 bg-red-100 canvas-container relative">
          <Image
            src={ShipImage}
            width={150}
            alt="ship"
            className="absolute -bottom-20 -left-6"
          />
          <canvas id="canvas3"></canvas>
        </div>
        <div className="flex justify-center py-9 text-3xl">
          혜빈이의 인생셋컷
        </div>
      </div>

      {/* Canvas to draw captured image */}
    </div>
  );
}
