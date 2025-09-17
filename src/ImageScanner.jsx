import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const ImageScanner = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [mirrored, setMirrored] = useState(false);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="captured" />
      ) : (
        <Webcam
          height={600}
          width={600}
          ref={webcamRef}
          mirrored={mirrored}
          screenshotFormat="image/jpeg"
          screenshotQuality={0.8}
        />
      )}
      
      <div className="controls">
        <input
          type="checkbox"
          checked={mirrored}
          onChange={(e) => setMirrored(e.target.checked)}
        />
        <label>Mirror</label>
      </div>

      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default ImageScanner;
