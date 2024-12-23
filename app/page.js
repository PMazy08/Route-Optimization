// "use client";
// import { useState, useEffect } from "react";
// import app from "../config";
// import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import Dashboard from "./dashboard/page.js";

// const Home = () => {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const auth = getAuth(app);
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const signInWithGoogle = async () => {
//     const auth = getAuth(app);
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//       router.push("/dashboard");
//     } catch (error) {
//       console.error("Error signing in with Google:", error.message);
//     }
//   };

//   return (
//     <div>
//       {user ? (
//         <Dashboard />
//       ) : (
//         <button onClick={signInWithGoogle}>
//           Sign In With Google
//         </button>
//       )}
//     </div>
//   );
// };

// export default Home;


// "use client";
// import { useState, useEffect } from "react";
// import app from "../config";
// import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { useRouter } from "next/navigation";

//   const Home = () => {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const auth = getAuth(app);
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   // const signInWithGoogle = async () => {
//   //   const auth = getAuth(app);
//   //   const provider = new GoogleAuthProvider();
//   //   // Set prompt to 'select_account' to force Google to show the account selection page
//   //   provider.setCustomParameters({ prompt: "select_account" });
    
//   //   try {
//   //     const result = await signInWithPopup(auth, provider);
//   //     // Signed in successfully
//   //     console.log("Signed in with Google:", result.user);
//   //     router.push("/home");
//   //   } catch (error) {
//   //     console.error("Error signing in with Google:", error.message);
//   //   }
//   // };

//   const signInWithGoogle = async () => {
//     const auth = getAuth(app);
//     const provider = new GoogleAuthProvider();
//     // Set prompt to 'select_account' to force Google to show the account selection page
//     provider.setCustomParameters({ prompt: "select_account" });
  
//     try {
//       const result = await signInWithPopup(auth, provider);
//       // Signed in successfully
//       console.log("Signed in with Google:", result.user);
  
//       // Get the Firebase ID token after successful login
//       const user = result.user;
//       const idToken = await user.getIdToken();
//       console.log("Firebase ID Token:", idToken);  // Output the ID Token
  
//       // You can now send the ID token to your backend or use it as needed
//       router.push("/home"); // Navigate to the home page after sign-in
//     } catch (error) {
//       console.error("Error signing in with Google:", error.message);
//     }
//   };
  

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <div className="relative flex flxe-col my-6 bg-white shadow-sm border bordre-slate-200 rounded-lg w-96">
//           <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//               <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//                 Route optimize
//               </h2>
//             </div>
//             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//               <form action="#" method="POST" className="space-y-6">
//                 <div>
//                   <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
//                     Work email
//                   </label>
//                   <div className="mt-2">
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       placeholder="Enter your Email"
//                       required
//                       autoComplete="email"
//                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus -outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
//                     Password
//                   </label>
//                   <div className="mt-2">
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       placeholder="Enter you password"
//                       required
//                       autoComplete="password"
//                       className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus -outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
//                     />
//                   </div>
//                 </div>

//                 <div className="text-sm">
//                   <a href="#" className="font-semibold text-600 hover:text-500">
//                     Forgot password?
//                   </a>
//                 </div>

//                 <div>
//                   <button type="submit" className="flex w-full justify-center rounded-md bg-zinc-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm ">Login</button>
//                 </div>
//                 <hr></hr>
//               </form>
//               <div>
//                 <button onClick={signInWithGoogle} className="flex w-full justify-center rounded-md bg-zinc-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm ">Continue with Google</button>
//               </div>
//               <div className="mt-6 text-center">
//                 <p className="text-sm text-gray-600">
//                   Don't have an account?{" "}
//                   <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                     Create account
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Home;


"use client";
import { useState, useEffect } from "react";
import app from "../config";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import '../app/login.css'

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [emailForPasswordReset, setEmailForPasswordReset] = useState(""); // สำหรับกรอกอีเมลในการรีเซ็ตรหัสผ่าน
  const [isResetModalOpen, setIsResetModalOpen] = useState(false); // สำหรับควบคุมการแสดง Modal
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!user.emailVerified) {
          // setError("Please verify your email before accessing your account.");
          auth.signOut();
          setUser(null);
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(null);
    const auth = getAuth(app);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        await auth.signOut();
        return;
      }


      const idToken = await user.getIdToken();
      console.log("JWT Token 1:", idToken);

      // console.log("User logged in:", user);


      router.push("/home");
    } catch (error) {
      // console.error("Error logging in:", error.message);
      // setError("Login failed: " + error.message);
    } 
  };

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // if (!user.emailVerified) {
      //   setError("Please verify your email before logging in.");
      //   await auth.signOut();
      //   return;
      // }

      // const idToken = await user.getIdToken();
      // console.log("JWT Token 2:", idToken);

      // console.log("Signed in with Google:", user);
      router.push("/home");
    } catch (error) {
      // console.error("Error signing in with Google:", error.message);
      // setError("Google sign-in failed: " + error.message);
    } 
  };

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    if (!emailForPasswordReset) {
      alert("Please enter your email address.");
      return;
    }

    const auth = getAuth(app);
    try {
      await sendPasswordResetEmail(auth, emailForPasswordReset);
      alert("Password reset email sent! Please check your inbox.");
      setIsResetModalOpen(false); // ปิด Modal หลังจากส่งอีเมล
    } catch (error) {
      alert("Error sending password reset email: " + error.message);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                Route Optimize
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                    Work email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your Email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your Password"
                    required
                    autoComplete="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-blue-500 sm:text-sm"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white"
                >
                  Login
                </button>
              </form>
              <hr />
              <button
                onClick={signInWithGoogle}
                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold text-white mt-4"
              >
                Continue with Google
              </button>


              {/* Forgot Password Link */}
              <div className="mt-4 text-center">
                <button
                  onClick={() => setIsResetModalOpen(true)}
                  className="text-blue-600 hover:text-blue-500 text-sm"
                >
                  Forgot your password?
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Create account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal for password reset */}
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
};

export default Home;
