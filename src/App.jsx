import './App.css'
import { getDatabase, ref, set } from 'firebase/database'
import { app } from './firebase'

function App() {

  return (
    <>
      <div className='text-4xl flex justify-center'>
        <h1>Firebase React App</h1>
        <div>
          <button className='bg-blue-500 p-3 rounded-2xl text-white' onClick={putData}>Put data</button>
        </div>
      </div>
    </>
  )
}

export default App
