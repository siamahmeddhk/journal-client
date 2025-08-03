import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
import useSpeechToText from "../hooks/useSpeechToText";

const JournalInput = ({ onSubmit }) => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    transcript,
    isListening,
    startListening,
    stopListening,
  } = useSpeechToText();

  useEffect(() => {
    if (transcript) {
      setContent(prev => `${prev} ${transcript}`.trim());
    }
  }, [transcript]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      document.getElementById("content-textarea")?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      Swal.fire({
        icon: "info",
        title: "Almost there!",
        text: "Please add both a title and some content",
        confirmButtonColor: "#4f46e5",
      });
      return;
    }

    setIsLoading(true);

    try {
      const newEntry = {
        title,
        content,
        createdAt: new Date().toISOString(),
        email: user?.email,
      };

      const res = await fetch("https://my-journal-s.vercel.app/journals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      if (res.ok) {
        onSubmit?.(newEntry);
        setTitle("");
        setContent("");
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: "Your thoughts are safely stored",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error("Save failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto lg:p-4 p-1">
      {/* Simple Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">New Journal Entry</h2>
        <p className="text-gray-600">Express your thoughts freely</p>
      </div>

      {/* Clean Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 text-start">
            Title
          </label>
          <input
            type="text"
            placeholder="Today's focus"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
          />
        </div>

        {/* Content with Voice Controls */}
        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Your thoughts
            </label>
            <button
              type="button"
              onClick={toggleListening}
              className={`text-sm flex items-center gap-1 px-2 py-1 rounded ${
                isListening 
                  ? "bg-red-100 text-red-600" 
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              <svg
                className={`w-4 h-4 ${isListening ? "animate-pulse" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1v11m0 0a3 3 0 003-3V5a3 3 0 00-6 0v4a3 3 0 003 3zm6 0a6 6 0 01-12 0m12 0v2a6 6 0 01-12 0v-2" />
              </svg>
              {isListening ? "Stop" : "Speak"}
            </button>
          </div>
          
          <textarea
            id="content-textarea"
            rows="6"
            placeholder="Write or speak your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
          />
          
          <div className="text-xs text-gray-500 mt-1">
            {content.split(/\s+/).filter(Boolean).length} words • {Math.ceil(content.length / 1000)} min read
          </div>
        </div>

        {/* Combined Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={isLoading || !title.trim() || !content.trim()}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition ${
              isLoading
                ? "bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300"
            } text-white`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Save Entry
              </>
            )}
          </button>
        </div>
      </form>

      {/* Helpful Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
        <p className="font-medium mb-1">Tip:</p>
        <p>Press the "Speak" button to dictate your thoughts instead of typing.</p>
      </div>
    </div>
  );
};

export default JournalInput;