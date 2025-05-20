// Firebase
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signOut,  } from "firebase/auth";
import { app } from "./firebase";
// CSS
import "./App.css";
// Pages
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/LogIn";
import { useState, useEffect } from "react";

const auth = getAuth(app);

function App() {
  // Hardcoding SignUp:
  // const signUpUser = () => {
  //   createUserWithEmailAndPassword(
  //     auth,
  //     "siddharthphogat@gmail.com",
  //     "siddharth@123"
  //   )
  //   .then((value) => console.log(value));
  // };

  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        // You are logged in
        console.log('Hello', user);
        setUser(user);
      }
      else{
        // Logged out
        console.log("You are logged out");
        setUser(null);
      }
    })
  }, [])

  if(user === null){
    return(
      <div className="bg-gray-900 text-4xl flex flex-col items-center h-full w-full gap-10">
        <h1 className="text-white">Firebase - Tutorial</h1>
        <SignUpPage />
        <LogInPage />
      </div>
    );
  }
  

  return (
    <>
      <div className="bg-gray-900 text-4xl flex flex-col items-center h-screen w-full gap-10">
        <h1 className="text-white">Firebase - Tutorial</h1>
        <h2 className="text-white">
          Hello {user.email}
        </h2>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => signOut(auth)}
        >LogOut</button>

      </div>
    </>
  );
}

export default App;
