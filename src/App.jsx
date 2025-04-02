import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "./firebase";
import "./App.css";

const auth = getAuth(app);

function App() {
  const signUpUser = () => {
    createUserWithEmailAndPassword(
      auth,
      "siddharthphogat@gmail.com",
      "siddharth@123"
    )
    .then((value) => console.log(value));
  };

  return (
    <>
      <div className="text-4xl flex justify-center">
        <h1>Firebase React App</h1>
        <div>
          <button
            className="bg-blue-500 p-3 rounded-2xl text-white"
            onClick={signUpUser}
          >
            Create User
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
