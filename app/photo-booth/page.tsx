// @ts-nocheck
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import ShipImage from '@/app/assets/ship.png';
import FlowerFrame from '@/app/assets/flowerFrame.png';
import Profile from '@/app/assets/profile.png';
import html2canvas from 'html2canvas';

export default function PhotoBooth() {
  const videoRef = useRef(null) as any; // Reference to the video element
  const [inputValue, setInputValue] = useState(0); // State to handle the range input
  const [imageCapture, setImageCapture] = useState(null); // State to store imageCapture instance
  const [isReady, setIsReady] = useState(false); // State to track if imageCapture is ready
  const [capturedImg, setCapturedImg] = useState([]);
  const [count, setCount] = useState(1);
  const container = useRef(null);

  // useEffect(() => {

  // })
  // useEffect(() => {
  function fetchVideoAndPlay() {
    // Access the video stream and set srcObject to the video element
    navigator.mediaDevices
      .getUserMedia({ video: true, facingMode: { exact: 'user' } })
      .then((mediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream; // Set the video source to the media stream
          videoRef.current.play(); // Play the video
        }

        const track = mediaStream.getVideoTracks()[0];
        const newImageCapture = new (window as any).ImageCapture(track); // Create new ImageCapture instance
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
  }
  // }, []);

  const onTakePhotoButtonClickMobile = (e) => {
    onTakePhotoButtonClick(e);
  };
  function onTakePhotoButtonClick(e) {
    e.preventDefault();

    console.log('사진촬영버튼 클릭');
    // document.querySelector('#capture_btn').addEventListener(
    //   'touchstart',
    //   function () {
    //     // some logic
    //     console.log(capture_btn);
    //   },
    //   { passive: false },
    // ); // <-- mark the event listerner as NOT passive

    console.log('imageCapture', imageCapture);
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

  /* Utils */
  function drawCanvas(img) {
    console.log(img);
    // const container = document.querySelector('.canvas-container');
    const canvas = document.getElementById(`canvas${count}`);

    // 슬라이싱 좀 더 학습 필요함
    canvas
      .getContext('2d')
      .drawImage(img, 100, 150, 1452, 1352, 0, 0, 320, 228);
  }

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

  function onButtonClick() {
    // This will allow us to play video later...
    videoRef.current.load();
    fetchVideoAndPlay();
    console.log('fetchVideoAndPlay');
  }
  return (
    <div className="flex flex-col self-center justify-center">
      {/* <div className="w-full h-20 bg-black fixed bottom-0"></div> */}
      <div className="w-80 flex flex-col justify-center self-center ml-10 mt-20">
        <button className="text-black bg-red-500" onClick={onButtonClick}>
          비디오 실행
        </button>
        <input
          style={{ display: 'none' }}
          type="range"
          value={inputValue}
          onChange={handleRangeChange} // Handle the range change
        />
        <video
          playsInline
          ref={videoRef}
          style={{ width: '100%', height: 'auto' }}
        />
        {/* Video element */}
        <div className="flex gap-2">
          <Button
            id="capture_btn"
            style={{ touchAction: 'none' }}
            // onClick={(e) => onTakePhotoButtonClick(e)}
            onTouchStart={(e) => onTakePhotoButtonClickMobile(e)}
            disabled={!isReady}
            className="bg-pink-400 my-5 text-white text-lg font-semibold font-mono w-1/2 mx-auto"
          >
            사진촬영
          </Button>
          <Button
            onClick={dowonload}
            //   disabled={!isReady}
            className="bg-pink-400 my-5 text-white text-lg font-semibold font-mono w-1/2 mx-auto"
          >
            Download
          </Button>
        </div>
      </div>
      <div
        ref={container}
        className="container top-1/2 left-0 
        w-auto h-full bg-black mx-auto p-8 flex flex-col gap-10 overflow-hidden z-20"
      >
        {/* <div className="flex justify-center text-2xl font-bold -my-2.5 text-pink-500">
          혜빈이의 인생네컷
        </div> */}
        <div
          className="bg-red-100 canvas-container relative after:content-[''] after:bg-flower-frame  after:absolute after:h-full after:w-full after:bg-contain after:top-0 after:rotate-180 after:z-0"
          style={{
            height: '228px',
            width: '320px',
            // backgroundImage: `url(${FlowerFrame.src})`,
            // backgroundSize: 'contain',
            // backgroundRepeat: 'no-repeat',
          }}
        >
          {/* <Image
            // style={{ left: '28px', bottom: '-64px', height: ' auto' }}
            src={FlowerFrame}
            // height={383}
            // width={265}
            alt="ship"
            className="absolute rotate-90 "
          /> */}
          <canvas id="canvas1" width={320} height={228}></canvas>
        </div>
        <div
          className="bg-red-100 canvas-container relative after:content-[''] after:bg-profile-frame  after:absolute after:h-full after:w-full after:bg-contain after:bg-no-repeat after:top-0 after:z-0 before:content-['나랑사진찍을래?ㅎ'] before:w-full before:text-black before:text-xl before:absolute before:left-32 before:top-0 before:z-50"
          //   className="bg-red-100 canvas-container relative"
          style={{ height: '228px', width: '320px' }}
        >
          {/* <div className="absolute text-lg text-black left-40 top-10">
            나랑 사진찍을래?ㅎ
          </div> */}

          {/* <Image
            style={{ left: '0', bottom: '0' }}
            src={Profile}
            // height={383}
            width={180}
            alt="ship"
            className="absolute"
          /> */}
          <canvas id="canvas2" width={320} height={228}></canvas>
        </div>
        <div
          className="bg-red-100 canvas-container relative"
          style={{ height: '228px', width: '320px' }}
        >
          <Image
            src={ShipImage}
            width={150}
            alt="ship"
            className="absolute -bottom-20 -right-6"
          />
          <canvas id="canvas3" width={320} height={228}></canvas>
        </div>
        <div className="flex justify-center py-9 text-3xl">
          혜빈이의 인생세컷
        </div>
      </div>
    </div>
  );
}
