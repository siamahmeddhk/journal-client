import { useState } from "react";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext"; // adjust path as needed

const JournalInput = ({ onSubmit }) => {
  const { user } = useAuthContext(); // access authenticated user
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in both title and content.",
        background: "#fff",
        color: "#374151",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    setIsLoading(true);

    const newEntry = {
      title,
      content,
      createdAt: new Date().toISOString(),
      email: user?.email, // now from context
    };

    try {
      const res = await fetch("https://my-journal-s.vercel.app/journals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Journal Saved!",
          text: "Your thoughts have been captured beautifully.",
          timer: 2000,
          showConfirmButton: false,
          background: "#fff",
          color: "#374151",
        });

        onSubmit?.(newEntry);
        setTitle("");
        setContent("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Save Failed",
          text: "Unable to save your journal entry. Please try again.",
          background: "#fff",
          color: "#374151",
          confirmButtonColor: "#ef4444",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Something went wrong. Please check your connection.",
        background: "#fff",
        color: "#374151",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="max-w-6xl mx-auto p-1 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 mb-3 sm:mb-4 shadow-lg">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Write Today's Journal
        </h2>
        <p className="text-gray-600 text-base sm:text-lg px-4">Capture your thoughts, dreams, and reflections</p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden"
      >
        <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* Title Input */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mr-2"></div>
              Journal Title
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="What's on your mind today?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-800 text-base sm:text-lg placeholder-gray-400 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm pr-12 sm:pr-14"
              />
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content Textarea */}
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 mr-2"></div>
              Your Thoughts
            </label>
            <div className="relative">
              <textarea
                rows="8"
                placeholder="Pour your heart out... What happened today? How do you feel? What are you grateful for?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none text-gray-800 text-base sm:text-lg placeholder-gray-400 transition-all duration-300 bg-gray-50/50 hover:bg-white focus:bg-white shadow-sm resize-none leading-relaxed pb-12"
              />
              <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-xs sm:text-sm text-gray-400 bg-white/80 px-2 sm:px-3 py-1 rounded-full">
                {content.length} characters
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl sm:rounded-2xl border border-indigo-100 space-y-2 sm:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-indigo-400"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-600">Words: {content.split(' ').filter(word => word.length > 0).length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-600">Reading time: ~{Math.ceil(content.split(' ').filter(word => word.length > 0).length / 200)} min</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-right">
              {new Date().toLocaleDateString('en-US', { 
                weekday: window.innerWidth < 640 ? 'short' : 'long', 
                year: window.innerWidth < 640 ? '2-digit' : 'numeric', 
                month: window.innerWidth < 640 ? 'short' : 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="p-4 sm:p-6 lg:p-8 pt-0">
          <button
            type="submit"
            disabled={isLoading || !title.trim() || !content.trim()}
            className="group w-full relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
          >
            <div className="flex items-center justify-center space-x-3">
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving Your Thoughts...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Save Journal Entry</span>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </>
              )}
            </div>
            
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </form>

      {/* Inspirational Quote */}
      <div className="mt-6 sm:mt-8 text-center px-4">
        <div className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 px-4 sm:px-6 py-3 bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/30 shadow-sm max-w-2xl">
          <svg className="w-4 h-4 text-indigo-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
          </svg>
          <span className="text-gray-600 italic text-sm sm:text-base text-center">
            "The life of every individual is a diary in which they mean to write one story, and writes another."
          </span>
        </div>
      </div>
    </div>
  );
};

export default JournalInput;
