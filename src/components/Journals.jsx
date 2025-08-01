import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FiTrash2, FiEdit, FiPlus, FiCalendar, FiClock, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/journals")
      .then((res) => res.json())
      .then((data) => {
        setJournals(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching journals:", error);
        setIsLoading(false);
        Swal.fire({
          title: "Error!",
          text: "Failed to load journals.",
          icon: "error",
          background: "#1f2937",
          color: "#f3f4f6",
          confirmButtonColor: "#3b82f6",
        });
      });
  }, []);

  const deleteJournal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this journal!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#f3f4f6",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/journals/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setJournals((prev) => prev.filter((j) => j._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Your journal has been deleted.",
                icon: "success",
                background: "#1f2937",
                color: "#f3f4f6",
                confirmButtonColor: "#3b82f6",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete the journal.",
                icon: "error",
                background: "#1f2937",
                color: "#f3f4f6",
                confirmButtonColor: "#3b82f6",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
              background: "#1f2937",
              color: "#f3f4f6",
              confirmButtonColor: "#3b82f6",
            });
          });
      }
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button and title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <FiArrowLeft className="text-xl" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
                My Journal Entries
              </span>
            </h2>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <FiPlus className="text-lg" />
            <span>New Entry</span>
          </button>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : journals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700"
          >
            <div className="text-gray-400 mb-4 text-6xl">📔</div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">No journal entries yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first journal entry</p>
            <button 
              onClick={() => navigate('/journals/new')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              Create First Entry
            </button>
          </motion.div>
        ) : (
          <ul className="space-y-4">
            <AnimatePresence>
              {journals.map((journal) => (
                <motion.li
                  key={journal._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2 gap-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-white break-words">
                          {journal.title}
                        </h3>
                        {journal.category && (
                          <span className="text-xs px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-full self-start sm:self-center">
                            {journal.category}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4 whitespace-pre-line break-words">
                        {journal.content}
                      </p>
                      
                      <div className="flex flex-col xs:flex-row xs:items-center space-y-2 xs:space-y-0 xs:space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <FiCalendar className="text-gray-500" />
                          <span>{formatDate(journal.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FiClock className="text-gray-500" />
                          <span>{formatTime(journal.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 self-end md:self-auto">
                      <button 
                        onClick={() => navigate(`/journals/edit/${journal._id}`)}
                        className="p-2 text-gray-400 hover:text-indigo-400 hover:bg-gray-700 rounded-lg transition-all"
                        aria-label="Edit journal"
                      >
                        <FiEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => deleteJournal(journal._id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-all"
                        aria-label="Delete journal"
                      >
                        <FiTrash2 className="text-lg" />
                      </button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Journals;