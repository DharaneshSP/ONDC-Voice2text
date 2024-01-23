"use client"

import React from 'react';

function App() {
  const [text, setText] = React.useState('');

  const handleListen = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert('Your browser does not support speech recognition. Please try again with a different browser.');
    } else {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.start();
      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setText(speechToText);
      };
    }
  };

  return (
    <div>
      <button onClick={handleListen}>Start</button>
      <p>{text}</p>
    </div>
  );
}

export default App;
