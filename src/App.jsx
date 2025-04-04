// Firebase
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "./firebase";
// CSS
import "./App.css";
// Pages
import SignUpPage from "./pages/SignUp";
import LogInPage from "./pages/LogIn";

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

  return (
    <>
      <div className="bg-gray-900 text-4xl flex flex-col items-center h-screen w-full gap-10">
        <h1 className="text-white">Firebase - Tutorial</h1>
        <SignUpPage />
        {/* <LogInPage /> */}
      </div>
    </>
  );
}

export default App;
