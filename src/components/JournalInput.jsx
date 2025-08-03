import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext";
import useSpeechToText from "../hooks/useSpeechToText";

const JournalInput = ({ onSubmit }) => {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(() => {
    // Initialize language from localStorage if available
    return localStorage.getItem("preferredLanguage") || "en-US";
  });
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [tempLanguage, setTempLanguage] = useState("en-US");
  const [rememberLanguage, setRememberLanguage] = useState(() => {
    // Initialize remember preference from localStorage
    // return localStorage.getItem("rememberLanguagePref") === "true";
  });

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
  } = useSpeechToText(language);

  // Load saved preferences on component mount
  // useEffect(() => {
  //   const savedLanguage = localStorage.getItem("preferredLanguage");
  //   const savedRememberPref = localStorage.getItem("rememberLanguagePref");
    
  //   if (savedLanguage && savedRememberPref === "true") {
  //     setLanguage(savedLanguage);
  //     setRememberLanguage(true);
  //   }
  // }, []);

  // Update content when transcript changes
  useEffect(() => {
    if (transcript) {
      setContent(prev => `${prev} ${transcript}`.trim());
    }
  }, [transcript]);

  const handleMicClick = () => {
    setTempLanguage(language);
    setShowLanguageModal(true);
  };

  const startVoiceInput = () => {
    const selectedLanguage = tempLanguage;
    setLanguage(selectedLanguage);
    
    if (rememberLanguage) {
      localStorage.setItem("preferredLanguage", selectedLanguage);
      localStorage.setItem("rememberLanguagePref", "true");
    } else {
      localStorage.removeItem("preferredLanguage");
      localStorage.removeItem("rememberLanguagePref");
    }
    
    setShowLanguageModal(false);
    startListening();
    document.getElementById("content-textarea")?.focus();
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      const savedLanguage = localStorage.getItem("preferredLanguage");
      if (savedLanguage && rememberLanguage) {
        setLanguage(savedLanguage);
        startListening();
        document.getElementById("content-textarea")?.focus();
      } else {
        handleMicClick();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      Swal.fire({
        icon: "info",
        title: "What's your entry about?",
        text: "Please add a title to continue",
        confirmButtonColor: "#4f46e5",
        didOpen: () => document.getElementById("title-input")?.focus()
      });
      return;
    }

    if (!content.trim()) {
      Swal.fire({
        icon: "info",
        title: "Empty thoughts?",
        text: "Please add some content to your journal",
        confirmButtonColor: "#4f46e5",
        didOpen: () => document.getElementById("content-textarea")?.focus()
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
        language,
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
          position: 'top-end',
          icon: "success",
          title: "Saved successfully!",
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#f0fdf4',
        });
      } else {
        throw new Error("Save failed");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "We couldn't save your entry. Please try again.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-2">New Journal Entry</h2>
        <p className="text-gray-600">Express yourself freely - write or speak your thoughts</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="title-input" className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              id="title-input"
              type="text"
              placeholder="e.g. Today's highlights, My weekend plans..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition"
              required
              autoFocus
            />
          </div>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="content-textarea" className="block text-sm font-medium text-gray-700">
              Your thoughts *
            </label>
            <button
              type="button"
              onClick={toggleListening}
              className={`text-sm flex items-center gap-2 px-3 py-1 rounded-md transition ${
                isListening 
                  ? "bg-red-100 text-red-600 shadow-inner" 
                  : "text-indigo-600 hover:bg-indigo-50"
              }`}
              aria-label={isListening ? "Stop recording" : "Start voice recording"}
            >
              <svg
                className={`w-4 h-4 ${isListening ? "animate-pulse text-red-500" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1v11m0 0a3 3 0 003-3V5a3 3 0 00-6 0v4a3 3 0 003 3zm6 0a6 6 0 01-12 0m12 0v2a6 6 0 01-12 0v-2" />
              </svg>
              <span>{isListening ? "Stop" : "Speak"}</span>
            </button>
          </div>

          <textarea
            id="content-textarea"
            rows="8"
            placeholder="Write your thoughts here... or click the 'Speak' button to dictate"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition min-h-[150px]"
            required
          />

          <div className="flex justify-between items-center mt-2 px-1">
            <div className="text-xs text-gray-500">
              {wordCount} {wordCount === 1 ? 'word' : 'words'} • ~{readingTime} min read
            </div>
            {content.length > 0 && (
              <button
                type="button"
                onClick={() => setContent("")}
                className="text-xs text-gray-500 hover:text-red-500 flex items-center transition"
                title="Clear content"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || !title.trim() || !content.trim()}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition ${
              isLoading
                ? "bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            } text-white shadow-md hover:shadow-lg`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Your Thoughts...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Journal Entry
              </>
            )}
          </button>
        </div>
      </form>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              <svg className="w-5 h-5 inline-block mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              Select Language for Voice Input
            </h3>
            <div className="space-y-3 mb-4">
              {[
                { code: "en-US", name: "English", flag: "🇺🇸" },
                { code: "bn-BD", name: "বাংলা (Bangla)", flag: "🇧🇩" },
                { code: "es-ES", name: "Español (Spanish)", flag: "🇪🇸" },
                { code: "fr-FR", name: "Français (French)", flag: "🇫🇷" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setTempLanguage(lang.code)}
                  className={`w-full text-left px-4 py-3 rounded-md flex items-center transition ${
                    tempLanguage === lang.code 
                      ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="mr-2 text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember-language"
                checked={rememberLanguage}
                onChange={(e) => setRememberLanguage(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-language" className="ml-2 block text-sm text-gray-700">
                Remember my language choice
              </label>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLanguageModal(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition"
              >
                Cancel
              </button>
              <button
                onClick={startVoiceInput}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center transition"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 1v11m0 0a3 3 0 003-3V5a3 3 0 00-6 0v4a3 3 0 003 3zm6 0a6 6 0 01-12 0m12 0v2a6 6 0 01-12 0v-2" />
                </svg>
                Start Speaking
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-sm text-gray-700 border border-indigo-100">
        <h3 className="font-medium text-indigo-700 mb-2 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Quick Tips
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Click <strong className="text-indigo-600">Speak</strong> to dictate instead of type</li>
          <li>Select your preferred language before speaking</li>
          <li>Check "Remember my language" to skip selection next time</li>
          <li>Add a clear title to easily find entries later</li>
          <li>Minimum 1 minute reading time for better reflection</li>
        </ul>
      </div>
    </div>
  );
};

export default JournalInput;