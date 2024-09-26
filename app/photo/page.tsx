// @ts-nocheck

'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/react';

export default function Photo() {
  const videoRef = useRef(null); // Reference to the video element
  const [inputValue, setInputValue] = useState(0); // State to handle the range input
  const [imageCapture, setImageCapture] = useState(null); // State to store imageCapture instance
  const [isReady, setIsReady] = useState(false); // State to track if imageCapture is ready

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
          drawCanvas(imageBitmap);
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

  /* Utils */
  function drawCanvas(img) {
    const canvas = document.querySelector('canvas');
    canvas.width = getComputedStyle(canvas).width.split('px')[0];
    canvas.height = getComputedStyle(canvas).height.split('px')[0];
    let ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
    let x = (canvas.width - img.width * ratio) / 2;
    let y = (canvas.height - img.height * ratio) / 2;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    canvas
      .getContext('2d')
      .drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        x,
        y,
        img.width * ratio,
        img.height * ratio,
      );
  }

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <input
        type="range"
        value={inputValue}
        onChange={handleRangeChange} // Handle the range change
      />
      <video ref={videoRef} style={{ width: '50%', height: 'auto' }} />{' '}
      {/* Video element */}
      <Button onClick={onTakePhotoButtonClick} disabled={!isReady}>
        사진촬영
      </Button>
      <canvas></canvas> {/* Canvas to draw captured image */}
    </div>
  );
}
