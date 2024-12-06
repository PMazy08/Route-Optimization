// "use client";

// import React, { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import Link from "next/link"; 
// import app from "../../config.js";

// function Signup() {
//   const auth = getAuth(app);
//   const router = useRouter();
// //   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // console.log(formData.email);
    
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(">>>> "+formData.email);
//     console.log(">>>> "+formData.password);

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     try {
//       const userVredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

//       const  user = userVredential.user;

//       await sendEmailVerification(user);

//       localStorage.setItem(
//         "registationData",
//         JSON.stringify({
//           email,
//           password
//         })
//       );

//       setMessage(
//         "Registration successful! Please check emil for verification"
//       )

//       // router.push("/home"); 
//     } catch (error) {
//       alert("Error: " + error.message);
//     }
//   };

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
//         <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-500 rounded w-96">
//           <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//             <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//               <h2 className=" text-2xl font-bold tracking-tight text-gray-900">
//                 Create account
//               </h2>
//               <div className="mt-2">
//                 <span>Sign up to route optimize</span>
//               </div>
//             </div>
//             <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-900">
//                     Work email
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     placeholder="Enter your Email"
//                     required
//                     autoComplete="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="block w-full text-sm text-gray-800 border border-gray-300 px-3 py-2 rounded outline-blue-600"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-900">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     placeholder="Enter your password"
//                     required
//                     autoComplete="new-password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     className="block w-full text-sm text-gray-800 border border-gray-300 px-3 py-2 rounded outline-blue-600"
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
//                     Confirm Password
//                   </label>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     placeholder="Confirm Password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className="block w-full text-sm text-gray-800 border border-gray-300 px-3 py-2 rounded outline-blue-600"
//                   />
//                 </div>

//                 <div>
//                   <button type="submit" className="flex w-full justify-center rounded bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm">
//                     Sign Up
//                   </button>
//                 </div>
//                 <hr />
//                 <div className="text-sm">
//                   Already have an account?{" "}
//                   <Link href="/" className="text-blue-600 underline">
//                     Login
//                   </Link>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Signup;


"use client";

import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link"; 
import app from "../../config.js";

function Signup() {
  const auth = getAuth(app);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await sendEmailVerification(user);

      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      );

      // setMessage("Registration successful! Please check your email for verification.");
      alert("Registration successful! Please check your email for verification.");
      setLoading(false);
      router.push("/");

      // Uncomment the following line if you want to redirect after signup.
      // router.push("/home");
    } catch (error) {
      setLoading(false);
      alert("มีบัญชีอยู่แล้ว");
      
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-500 rounded w-96">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Create account
              </h2>
              <div className="mt-2">
                <span>Sign up to route optimize</span>
              </div>
            </div>
            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
              {message && <p className="text-green-500 mb-4">{message}</p>}
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
                    value={formData.email}
                    onChange={handleInputChange}
                    className="block w-full text-sm text-gray-800 border border-gray-300 px-3 py-2 rounded outline-blue-600"
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
                    placeholder="Enter your password"
                    required
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full text-sm text-gray-800 border border-gray-300 px-3 py-2 rounded outline-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="mew-password"
                    placeholder="Confirm Password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="block w-full text-sm text-gray-800 border border-gray-300 px-3 py-2 rounded outline-blue-600"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full justify-center rounded bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm"
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
                </div>
                <hr />
                <div className="text-sm">
                  Already have an account?{" "}
                  <Link href="/" className="text-blue-600 underline">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;
