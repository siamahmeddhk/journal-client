import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { FiTrash2, FiEdit, FiPlus, FiCalendar, FiClock, FiArrowLeft } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";



const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingJournal, setEditingJournal] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    if (!user?.email) return;

    setIsLoading(true);
    fetch(`https://my-journal-s.vercel.app/journals?email=${user.email}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Ensure data is always an array
        const journalsData = Array.isArray(data) ? data : data?.journals || data?.data || [];
        setJournals(journalsData);
      })
      .catch((error) => {
        console.error("Error fetching journals:", error);
        setJournals([]); // Ensure journals is empty array on error
        Swal.fire({
          title: "Error!",
          text: "Failed to load journals.",
          icon: "error",
          background: "#1f2937",
          color: "#f3f4f6",
          confirmButtonColor: "#3b82f6",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user?.email]);

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
        fetch(`https://my-journal-s.vercel.app/journals/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setJournals((prev) => (Array.isArray(prev) ? prev.filter((j) => j._id !== id) : []));
              Swal.fire({
                title: "Deleted!",
                text: "Your journal has been deleted.",
                icon: "success",
                background: "#1f2937",
                color: "#f3f4f6",
                confirmButtonColor: "#3b82f6",
              });
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the journal.",
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
    try {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return "Unknown date";
    }
  };

  const formatTime = (dateString) => {
    try {
      const options = { hour: "2-digit", minute: "2-digit" };
      return new Date(dateString).toLocaleTimeString(undefined, options);
    } catch {
      return "Unknown time";
    }
  };

  const openEditModal = (journal) => {
    setEditingJournal(journal);
    setEditTitle(journal?.title || "");
    setEditContent(journal?.content || "");
  };

  const closeEditModal = () => {
    setEditingJournal(null);
    setEditTitle("");
    setEditContent("");
    setIsUpdating(false);
  };

  const onClickOutsideModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeEditModal();
    }
  };

  const saveUpdate = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      Swal.fire({
        title: "Oops!",
        text: "Title and content cannot be empty.",
        icon: "warning",
        background: "#1f2937",
        color: "#f3f4f6",
        confirmButtonColor: "#3b82f6",
      });
      return;
    }

    if (!editingJournal?._id) return;

    setIsUpdating(true);

    try {
      const res = await fetch(`https://my-journal-s.vercel.app/journals/${editingJournal._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      const data = await res.json();

      if (data.success) {
        setJournals((prev) =>
          Array.isArray(prev)
            ? prev.map((j) =>
                j._id === editingJournal._id ? { ...j, title: editTitle, content: editContent } : j
              )
            : []
        );
        closeEditModal();
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update journal.",
        icon: "error",
        background: "#1f2937",
        color: "#f3f4f6",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setIsUpdating(false);
    }
  };
   
  const filteredJournals = selectedDate
  ? journals.filter((j) => {
      const journalDate = new Date(j.createdAt).toDateString();
      const selected = new Date(selectedDate).toDateString();
      return journalDate === selected;
    })
  : journals;




  // Safely check if journals is an array and has items
  const hasJournals = Array.isArray(journals) && journals.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
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
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <FiPlus className="text-lg" />
            <span>New Entry</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
  <div className="flex items-center space-x-3">
    <span className="text-white font-medium">Filter by Date:</span>
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select a date"
      className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
    />
    {selectedDate && (
      <button
        onClick={() => setSelectedDate(null)}
        className="text-sm text-red-400 hover:underline"
      >
        Clear
      </button>
    )}
  </div>
</div>


        {/* Loading / Empty / List */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : !hasJournals ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700"
          >
            <div className="text-gray-400 mb-4 text-6xl">📔</div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">No journal entries yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first journal entry</p>
            <button
              onClick={() => navigate("/")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-all duration-300"
            >
              Create First Entry
            </button>
          </motion.div>
        ) : (
          <ul className="space-y-4">
            <AnimatePresence>
              {filteredJournals.map((journal) => (
                <motion.li
                  key={journal._id || Math.random().toString(36).substring(2, 9)}
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
                          {journal.title || "Untitled Journal"}
                        </h3>
                        {journal.category && (
                          <span className="text-xs px-2 py-1 bg-indigo-900/50 text-indigo-300 rounded-full self-start sm:self-center">
                            {journal.category}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 mb-4 whitespace-pre-line break-words">
                        {journal.content || "No content"}
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
                        onClick={() => openEditModal(journal)}
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

        {/* Edit Modal */}
        <AnimatePresence>
          {editingJournal && (
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClickOutsideModal}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
            >
              <motion.div
                ref={modalRef}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-gray-900 rounded-lg max-w-lg w-full p-6 shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">Edit Journal</h3>
                <label className="block mb-2 text-gray-300 font-medium" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded px-3 py-2 mb-4 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-500"
                  disabled={isUpdating}
                />
                <label className="block mb-2 text-gray-300 font-medium" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  rows="6"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full rounded px-3 py-2 mb-4 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-500 resize-none"
                  disabled={isUpdating}
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={closeEditModal}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveUpdate}
                    className={`px-4 py-2 rounded-lg text-white transition-colors duration-200 ${
                      isUpdating ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Journals;