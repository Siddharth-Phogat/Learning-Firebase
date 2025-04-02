import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => alert("User LoggedIn"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col w-1/3 gap-6 mb-6 p-2.5 outline-4 rounded-lg outline-gray-600">
      <div className="text-3xl text-white font-medium self-center">
        LOGIN Page
      </div>
      <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
        Enter Your Registered Email
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="email"
        required
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
        Enter Your Registered Password
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-2xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="password"
        required
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={loginUser}
      >
        Log In
      </button>
    </div>
  );
};

export default LogInPage;
