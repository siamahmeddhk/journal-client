// // hooks/useSpeechToText.js
// import { useState, useEffect, useRef } from "react";

// const useSpeechToText = () => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Sorry, your browser doesn't support Speech Recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onresult = (event) => {
//       const speechToText = event.results[0][0].transcript;
//       setTranscript(speechToText);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech Recognition Error", event);
//     };

//     recognitionRef.current = recognition;
//   }, []);

//   const startListening = () => {
//     setTranscript("");
//     recognitionRef.current?.start();
//     setIsListening(true);
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   };

//   return { transcript, isListening, startListening, stopListening };
// };

// export default useSpeechToText;








// hooks/useSpeechToText.js
// import { useState, useEffect, useRef } from "react";

// const useSpeechToText = (language = "en-US") => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Sorry, your browser doesn't support Speech Recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = language;

//     recognition.onresult = (event) => {
//       const speechToText = event.results[0][0].transcript;
//       setTranscript(speechToText);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech Recognition Error", event);
//     };

//     recognitionRef.current = recognition;
//   }, [language]); // Reactivate when language changes

//   const startListening = () => {
//     setTranscript("");
//     recognitionRef.current?.start();
//     setIsListening(true);
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   };

//   return { transcript, isListening, startListening, stopListening };
// };

// export default useSpeechToText;










// // hooks/useSpeechToText.js
// import { useState, useEffect, useRef } from "react";

// const useSpeechToText = (language = "en-US") => {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState("");
//   const recognitionRef = useRef(null);

//   useEffect(() => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Sorry, your browser doesn't support Speech Recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true; // 👈 Keep listening
//     recognition.interimResults = true;
//     recognition.lang = language;

//     recognition.onresult = (event) => {
//       const speechToText = event.results[event.results.length - 1][0].transcript;
//       setTranscript((prev) => prev + " " + speechToText);
//     };

//     recognition.onerror = (event) => {
//       console.error("Speech Recognition Error", event);
//     };

//     recognitionRef.current = recognition;
//   }, [language]);

//   const startListening = () => {
//     setTranscript(""); // optional, reset or keep as needed
//     recognitionRef.current?.start();
//     setIsListening(true);
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   };

//   return { transcript, isListening, startListening, stopListening };
// };

// export default useSpeechToText;





import { useState, useEffect, useRef } from "react";

const useSpeechToText = (language = "bn-BD") => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const lastFinalTranscriptRef = useRef(""); // track last final result

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Sorry, your browser doesn't support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false; // you can also try true
    recognition.lang = language;

    recognition.onresult = (event) => {
      let currentTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        currentTranscript += event.results[i][0].transcript;
      }

      // ✅ check if it's repeating last part
      if (!lastFinalTranscriptRef.current.includes(currentTranscript.trim())) {
        const updatedTranscript = lastFinalTranscriptRef.current + " " + currentTranscript;
        lastFinalTranscriptRef.current = updatedTranscript.trim();
        setTranscript(updatedTranscript.trim());
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
    };

    recognition.onend = () => {
      if (isListening) recognition.start();
    };

    recognitionRef.current = recognition;
  }, [language, isListening]);

  const startListening = () => {
    setTranscript("");
    lastFinalTranscriptRef.current = "";
    recognitionRef.current?.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return { transcript, isListening, startListening, stopListening };
};

export default useSpeechToText;
