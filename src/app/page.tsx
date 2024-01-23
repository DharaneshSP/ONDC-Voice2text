"use client"

import React, { useEffect } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const App = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // useEffect(() => {
  //   // Client-side code for initialization
  //   if (browserSupportsSpeechRecognition) {
  //     // Add any client-side initialization logic here
  //   }

  //   // Clean up any client-side resources on component unmount
  //   return () => {
  //     // Clean up logic here (if needed)
  //   };
  // }, [browserSupportsSpeechRecognition]); // Adjust dependencies based on your needs

  const startListeningHandler = async () => {
    try {
      await SpeechRecognition.startListening();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
    }
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListeningHandler}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
};

export default App;
