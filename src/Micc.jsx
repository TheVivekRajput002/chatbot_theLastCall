import React, { useState, useRef, useEffect } from 'react';
import { Mic } from 'lucide-react';
import recordingAnimation from './assets/recording-animation.webm'
import static_micAnimation_img from './assets/image.png'

const Micc = () => {
  // State to track if GIF animation is active
  const [isListening, setIsListening] = useState(false);

  // Ref to control the GIF element
  const gifRef = useRef(null);

  // Toggle GIF animation
  const toggleListening = () => {
    setIsListening(!isListening);
  };

  // Reset GIF to starting point when stopping
  useEffect(() => {
    if (gifRef.current) {
      const video = gifRef.current;

      if (isListening) {
        // Start playing from beginning
        video.currentTime = 0;
        video.play().catch(console.error);
      } else {
        // Pause and reset to frame 0
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isListening]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      {/* Fixed voice input button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={toggleListening}
          className="transition-all duration-300 hover:scale-105"
        >
          <div className="h-20">
            <video
              ref={gifRef}
              src={recordingAnimation}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </button>

        {/* Button label */}
        <div className="absolute bottom-16 right-0 text-xs text-gray-600 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">
          {isListening ? 'Recording...' : 'Click to record'}
        </div>
      </div>
    </div>
  );
};

export default Micc;