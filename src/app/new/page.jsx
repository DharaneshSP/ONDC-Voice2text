"use client"

import React, { useState, useEffect } from 'react';

const SpeechRecognitionComponent = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    if (annyang) {
      annyang.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (annyang) {
      annyang.abort();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    // Check if window is defined to ensure the code is executed in the browser
    if (typeof window !== 'undefined') {
      const annyang = require('annyang');
      
      if (annyang) {
        annyang.addCallback('result', (phrases) => {
          setTranscript(phrases[0]);
        });
      }

      return () => {
        if (annyang) {
          annyang.removeCallback('result');
          annyang.abort();
        }
      };
    }
  }, []);

  return (
    <div>
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
      </div>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
