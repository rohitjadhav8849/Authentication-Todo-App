"use client";

import { useState } from "react";
import { signupUser } from "@/services/auth";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await signupUser(username, email, password);

      console.log(data);

      alert("Signup Successful");
    } catch (error) {
      console.log(error);

      alert("Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-6">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>
  
          <p className="text-gray-400 mt-2">
            Join and start managing your todos ✨
          </p>
        </div>
  
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
              Username
            </label>
  
            <input
              type="text"
              placeholder="Enter your username"
              className="bg-black/30 border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
            />
          </div>
  
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
              Email
            </label>
  
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black/30 border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>
  
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-300">
              Password
            </label>
  
            <input
              type="password"
              placeholder="Enter your password"
              className="bg-black/30 border border-gray-700 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>
  
          <button
            type="submit"
            className="mt-3 bg-white text-black py-4 rounded-2xl font-semibold text-lg hover:bg-gray-200 hover:scale-[1.02] transition-all duration-300 shadow-xl"
          >
            Create Account
          </button>
        </form>
  
        <p className="text-center text-gray-400 mt-8">
          Already have an account?{" "}
          <span className="text-white font-semibold cursor-pointer hover:underline">
            Signin
          </span>
        </p>
      </div>
    </div>
  );
}