// "use client";
// import React, { useEffect, useState } from "react";
// import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import app from "../../config.js";
// import Map from "../components/Map.js";

// function Dashboard() {
//   const auth = getAuth(app);
//   const router = useRouter();
//   const [user, setUser] = useState(null);

  
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//         router.push("/signup"); // Redirect if not logged in
//       }
//     });

//     return () => unsubscribe();
//   }, [auth, router]);

//   const handleSignOut = async () => {
//     try {
//       await signOut(auth);
//       router.push("/"); // Redirect to the home page after sign out
//     } catch (error) {
//       console.error("Error signing out:", error.message);
//     }
//   };


//   return (
//     <div>
//         <h1>Welcome, {user?.email?.split('@')[0]}</h1>
//         <div>
//             <Map />
//         </div>
//       <button onClick={handleSignOut}>Sign Out</button>
//     </div>
//   );
// }

// export default Dashboard;

"use client";
import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import app from "../../config.js";
import Map from "../components/Map.js";
import "../home/style.css"

function Dashboard() {
  const auth = getAuth(app);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [emailForPasswordReset, setEmailForPasswordReset] = useState(""); // State for email input
  const [isResetModalOpen, setIsResetModalOpen] = useState(false); // To control reset modal visibility

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/signup"); // Redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to the home page after sign out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    if (!emailForPasswordReset) {
      alert("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, emailForPasswordReset);
      alert("Password reset email sent! Please check your inbox.");
      setIsResetModalOpen(false); // Close the modal after sending the reset email
    } catch (error) {
      alert("Error sending password reset email: " + error.message);
    }
  };

  return (
    <div>
      <h1>Welcome, {user?.email?.split('@')[0]}</h1>
      <div>
        <Map />
      </div>

      <button onClick={handleSignOut} style={{backgroundColor: "red"}}>Sign Out</button>

      {/* Button to trigger password reset modal */}
      <button onClick={() => setIsResetModalOpen(true)}  style={{backgroundColor: "yellow", marginLeft: "10px"}} >Change Password</button>

      {/* Password Reset Modal */}
      {isResetModalOpen && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg w-96 p-6 shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 text-center">Reset Password</h2>
      <form onSubmit={handlePasswordResetRequest} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Enter your email address:</label>
          <input
            type="email"
            id="email"
            value={emailForPasswordReset}
            onChange={(e) => setEmailForPasswordReset(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Send Reset Link
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setIsResetModalOpen(false)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Dashboard;


