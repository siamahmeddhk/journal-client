// // Import the functions you need from the SDKs you need

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBcJc48a1bohMRsIN8xj_z9EVv7COfGRrc",
//   authDomain: "journals-1c5aa.firebaseapp.com",
//   projectId: "journals-1c5aa",
//   storageBucket: "journals-1c5aa.firebasestorage.app",
//   messagingSenderId: "221125291832",
//   appId: "1:221125291832:web:dcdb0497e7e6ea951ddbcd"
// };

// // Initialize Firebase
// export default firebaseConfig


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export default firebaseConfig;
