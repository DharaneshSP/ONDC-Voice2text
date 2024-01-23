"use client"

import React, { useState, useEffect } from "react";

function App() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [mic, setMic] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeSpeechRecognition();
    }
  }, []);

  useEffect(() => {
    if (mic) {
      handleListen();
    }
  }, [mic, isListening]);

  const initializeSpeechRecognition = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const newMic = new SpeechRecognition();
      newMic.continuous = true;
      newMic.interimResults = true;
      newMic.lang = "en-US";

      newMic.onstart = () => {
        console.log("Mics on");
      };

      newMic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log(transcript);
        setNote(transcript);
      };

      setMic(newMic);
    } else {
      alert("Speech recognition not supported on this browser");
    }
  };

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
  };

  const handleSaveNote = () => {
    if (note.trim() !== "") {
      setSavedNotes([...savedNotes, note]);
      setNote("");
    }
  };

  return (
    <>
      <div className="container">
        <div className="box">
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Notes
          </button>
          <div></div>
          <button onClick={() => setIsListening((prevState) => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box mt-10">
          <h2>Notes</h2>
          {savedNotes.map((n, index) => (
            <p key={index}>{n}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
