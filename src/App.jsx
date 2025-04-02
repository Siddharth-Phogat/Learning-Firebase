// Firebase
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "./firebase";
// CSS
import "./App.css";
// Pages
import SignUpPage from "./pages/SignUp";

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
      <div className="bg-gray-900 text-4xl flex flex-col items-center justify-center h-screen w-full gap-10">
        <h1 className="text-white">Firebase - Tutorial</h1>
        <SignUpPage />
      </div>
    </>
  );
}

export default App;
