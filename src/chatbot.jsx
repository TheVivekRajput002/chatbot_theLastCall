import React, { useState, useEffect, useRef, useCallback } from 'react';

const VoiceChatbot = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Click to start recording');
  const [statusClass, setStatusClass] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [connectionMessage, setConnectionMessage] = useState('Connecting to server...');
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audio_recorded = useRef(null);
  const websocketRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationIdRef = useRef(null);
  const audioPlayerRef = useRef(null);
  const visualizerRef = useRef(null);

  const updateConnectionStatus = useCallback((status, message) => {
    setConnectionStatus(status);
    setConnectionMessage(message);
  }, []);

  const connectWebSocket = useCallback(() => {
    try {
      websocketRef.current = new WebSocket('ws://localhost:8000/ws');
      
      websocketRef.current.onopen = () => {
        console.log('WebSocket connected');
        updateConnectionStatus('connected', 'Connected to server');
      };
      
      websocketRef.current.onmessage = (event) => {
        console.log('Received response from server');
        handleServerResponse(event.data);
      };
      
      websocketRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        updateConnectionStatus('disconnected', 'Disconnected from server');
        // Attempt to reconnect after 3 seconds
        setTimeout(connectWebSocket, 3000);
      };
      
      websocketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        updateConnectionStatus('disconnected', 'Connection error');
      };
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      updateConnectionStatus('disconnected', 'Failed to connect');
    }
  }, [updateConnectionStatus]);

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Setup audio context for visualization
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 64;
      dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      // Setup media recorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        audio_recorded.current = audioBlob;
        audioChunksRef.current = [];
        sendAudioToServer(audio_recorded.current);
      };
      
      console.log('Audio initialized successfully');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      updateStatus('Error accessing microphone');
    }
  };

  const updateStatus = (message, className = '') => {
    setStatus(message);
    setStatusClass(className);
  };

  const sendAudioToServer = (audioBlob) => {
    if (!websocketRef.current || websocketRef.current.readyState !== WebSocket.OPEN) {
      updateStatus('Not connected to server');
      return;
    }
    
    // Convert blob to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64Audio = reader.result.split(',')[1];
      const message = {
        type: 'audio',
        data: base64Audio
      };
      websocketRef.current.send(JSON.stringify(message));
      updateStatus('Sent to server, waiting for response...');
    };
    reader.readAsDataURL(audioBlob);
  };

  const handleServerResponse = (data) => {
    try {
      const response = JSON.parse(data);
      
      if (response.type === 'audio' && response.data) {
        // Convert base64 back to blob and play
        const audioData = `data:audio/wav;base64,${response.data}`;
        if (audioPlayerRef.current) {
          audioPlayerRef.current.src = audioData;
          audioPlayerRef.current.style.display = 'block';
          audioPlayerRef.current.play();
        }
        
        updateStatus('Playing response...', 'playing');
        
        if (audioPlayerRef.current) {
          audioPlayerRef.current.onended = () => {
            updateStatus('Click to start recording');
            audioPlayerRef.current.style.display = 'none';
          };
        }
      } else if (response.message) {
        updateStatus(response.message);
      }
    } catch (error) {
      console.error('Error handling server response:', error);
      updateStatus('Error processing server response');
    }
  };

  const startVisualization = () => {
    if (!analyserRef.current || !visualizerRef.current) return;
    
    const visualizer = visualizerRef.current;
    visualizer.innerHTML = '';
    
    // Create wave bars
    for (let i = 0; i < 32; i++) {
      const bar = document.createElement('div');
      bar.className = 'wave-bar';
      bar.style.height = '10px';
      visualizer.appendChild(bar);
    }
    
    const animate = () => {
      if (!isRecording) return;
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const bars = visualizer.children;
      
      for (let i = 0; i < bars.length; i++) {
        const height = (dataArrayRef.current[i] / 255) * 50 + 10;
        bars[i].style.height = height + 'px';
      }
      
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const stopVisualization = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    if (visualizerRef.current) {
      visualizerRef.current.innerHTML = '';
    }
  };

  const startRecording = async () => {
    if (!mediaRecorderRef.current) {
      updateStatus('Initializing microphone...');
      await initializeAudio();
      if (!mediaRecorderRef.current) return;
    }
    
    setIsRecording(true);
    audioChunksRef.current = [];
    mediaRecorderRef.current.start();
    
    updateStatus('Recording...', 'recording');
    startVisualization();
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current || !isRecording) return;
    
    setIsRecording(false);
    mediaRecorderRef.current.stop();
    
    updateStatus('Processing...', 'processing');
    stopVisualization();
  };

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  useEffect(() => {
    connectWebSocket();
    initializeAudio();

    // Cleanup function
    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [connectWebSocket]);

  const MicIcon = () => (
    <svg className="mic-icon" viewBox="0 0 24 24" fill="white">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6.92h-2z"/>
    </svg>
  );

  const StopIcon = () => (
    <svg className="stop-icon" viewBox="0 0 24 24" fill="white">
      <rect x="6" y="6" width="12" height="12"/>
    </svg>
  );

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 500px;
          width: 100%;
        }
        
        h1 {
          color: #333;
          margin-bottom: 30px;
          font-size: 2.5em;
          font-weight: 300;
        }
        
        .record-button {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .record-button:not(.recording) {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        }
        
        .record-button.recording {
          background: linear-gradient(45deg, #ff4757, #c44569);
          animation: pulse 1.5s infinite;
        }
        
        .record-button:hover {
          transform: scale(1.05);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
        }
        
        .record-button:active {
          transform: scale(0.95);
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(255, 71, 87, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 71, 87, 0);
          }
        }
        
        .mic-icon {
          width: 60px;
          height: 60px;
        }
        
        .stop-icon {
          width: 40px;
          height: 40px;
        }
        
        .status {
          margin: 20px 0;
          font-size: 1.2em;
          color: #555;
          min-height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .status.recording {
          color: #ff4757;
          font-weight: 600;
        }
        
        .status.processing {
          color: #3742fa;
        }
        
        .status.playing {
          color: #2ed573;
        }
        
        .connection-status {
          margin-top: 20px;
          padding: 10px;
          border-radius: 10px;
          font-size: 0.9em;
        }
        
        .connected {
          background: rgba(46, 213, 115, 0.2);
          color: #2ed573;
        }
        
        .disconnected {
          background: rgba(255, 71, 87, 0.2);
          color: #ff4757;
        }
        
        .connecting {
          background: rgba(55, 66, 250, 0.2);
          color: #3742fa;
        }
        
        .audio-controls {
          margin-top: 30px;
        }
        
        .audio-player {
          width: 100%;
          margin-top: 20px;
          border-radius: 25px;
          outline: none;
        }
        
        .visualizer {
          width: 100%;
          height: 60px;
          margin: 20px 0;
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .wave-bar {
          width: 4px;
          background: linear-gradient(to top, #667eea, #764ba2);
          margin: 0 1px;
          border-radius: 2px;
          transition: height 0.1s ease;
        }
      `}</style>

      <div className="container">
        <h1>Voice Chat</h1>
        
        <button 
          className={`record-button ${isRecording ? 'recording' : ''}`}
          onClick={toggleRecording}
        >
          {isRecording ? <StopIcon /> : <MicIcon />}
        </button>
        
        <div className={`status ${statusClass}`}>
          {status}
        </div>
        
        <div className="visualizer" ref={visualizerRef}></div>
        
        <div className={`connection-status ${connectionStatus}`}>
          {connectionMessage}
        </div>
        
        <div className="audio-controls">
          <audio 
            className="audio-player" 
            ref={audioPlayerRef}
            controls 
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </>
  );
};

export default VoiceChatbot;