// import React, { useEffect, useState } from 'react';

// const Journals = () => {

//     const [getjournal, setgetjournal] = useState([])
//     const [loading, setloading] = useState(true)

//     useEffect(()=>{
//         fetch('http://localhost:5000/journals')
//         .then((res)=>res.json())
//         .then((data=>{
//             setgetjournal(data)
//             setloading(false)
//         }))
//     })

//     return (
//         <div>
//              <div className="max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">📓 My Journals</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : getjournal.length === 0 ? (
//         <p>No journal entries found.</p>
//       ) : (
//         getjournal.map((journal) => (
//           <div
//             key={journal._id}
//             className="border rounded-md shadow-md p-4 mb-4 bg-white"
//           >
//             <h2 className="text-xl font-semibold">{journal.title}</h2>
//             <p className="text-gray-700 mt-2">{journal.content}</p>
//             <p className="text-sm text-gray-500 mt-2">
//               {new Date(journal.createdAt).toLocaleString()}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//         </div>
//     );
// };

// export default Journals;

// gork

// import React, { useEffect, useState } from 'react';

// const Journals = () => {
//   const [getjournal, setgetjournal] = useState([]);
//   const [loading, setloading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:5000/journals')
//       .then((res) => res.json())
//       .then((data) => {
//         setgetjournal(data);
//         setloading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching journals:', error);
//         setloading(false);
//       });
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-2">
//           <span>📓</span> My Journals
//         </h1>
//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
//           </div>
//         ) : getjournal.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-lg text-gray-600">No journal entries found.</p>
//             <p className="text-sm text-gray-500 mt-2">Start writing your thoughts today!</p>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {getjournal.map((journal) => (
//               <div
//                 key={journal._id}
//                 className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
//               >
//                 <h2 className="text-xl font-semibold text-gray-900 mb-3">{journal.title}</h2>
//                 <p className="text-gray-600 leading-relaxed mb-4">{journal.content}</p>
//                 <p className="text-sm text-gray-400">
//                   {new Date(journal.createdAt).toLocaleString('en-US', {
//                     year: 'numeric',
//                     month: 'long',
//                     day: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Journals;

// gemini ai

// import React, { useEffect, useState } from 'react';

// const Journals = () => {
//     const [journals, setJournals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null); // Added for error handling

//     useEffect(() => {
//         const fetchJournals = async () => {
//             try {
//                 const res = await fetch('http://localhost:5000/journals');
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! status: ${res.status}`);
//                 }
//                 const data = await res.json();
//                 setJournals(data);
//             } catch (err) {
//                 console.error("Failed to fetch journals:", err);
//                 setError("Failed to load journals. Please try again later.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchJournals();
//     }, []); // Empty dependency array to run only once on mount

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-sans">
//             <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8 space-y-6">
//                 <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
//                     <span className="text-indigo-600">📓</span> My Digital Journal
//                 </h1>

//                 {loading ? (
//                     <div className="flex justify-center items-center py-10">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-500"></div>
//                         <p className="ml-4 text-lg text-gray-600">Loading your thoughts...</p>
//                     </div>
//                 ) : error ? (
//                     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-center" role="alert">
//                         <span className="block sm:inline">{error}</span>
//                     </div>
//                 ) : journals.length === 0 ? (
//                     <div className="text-center py-10 text-gray-600 text-lg">
//                         <p>It looks a little quiet in here.</p>
//                         <p>No journal entries found. Time to write something inspiring!</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {journals.map((journal) => (
//                             <div
//                                 key={journal._id}
//                                 className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between transform hover:-translate-y-1"
//                             >
//                                 <div>
//                                     <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
//                                         {journal.title}
//                                     </h2>
//                                     <p className="text-gray-700 text-base line-clamp-4 mb-4">
//                                         {journal.content}
//                                     </p>
//                                 </div>
//                                 <p className="text-sm text-gray-500 font-medium mt-auto pt-3 border-t border-gray-100">
//                                     <span className="mr-2">🗓️</span>
//                                     {new Date(journal.createdAt).toLocaleDateString('en-US', {
//                                         year: 'numeric',
//                                         month: 'long',
//                                         day: 'numeric',
//                                         hour: '2-digit',
//                                         minute: '2-digit',
//                                     })}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Journals;

// deepseek ai
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await fetch("http://localhost:5000/journals");
        if (!response.ok) {
          throw new Error("Failed to fetch journals");
        }
        const data = await response.json();
        setJournals(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Dashboard
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-2">
            📖 My Journal Entries
          </h1>
          <p className="text-lg text-indigo-700">
            Reflections and thoughts captured over time
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>Error: {error}</p>
          </div>
        ) : journals.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">✏️</span>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No entries yet
            </h3>
            <p className="text-gray-500">
              Your journal entries will appear here once created
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {journals.map((journal) => (
              <div
                key={journal._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {journal.title}
                    </h2>
                    <span className="text-xs bg-indigo-100 text-indigo-800 py-1 px-2 rounded-full">
                      {new Date(journal.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-4 whitespace-pre-line">
                    {journal.content}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <span className="text-sm text-gray-500">
                      {new Date(journal.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Journals;
