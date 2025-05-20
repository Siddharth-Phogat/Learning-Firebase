import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Initialize Firebase Services
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);
const googleProvider = new GoogleAuthProvider();

// using asyncThunk for signup
export const signUpUserWithEmailAndPassword = createAsyncThunk(
  // this is the name/path we give it, so that we can use it with help of this name
  // firebase->signUpUser
  'firebase/signUpUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// asyncThunk for data storing
export const putData = createAsyncThunk(
  'firebase/putData',
  async ({ key, data }, { rejectWithValue }) => {
    try {
      await set(ref(firebaseDatabase, key), data);
      return { key, data }; // success 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signInWithGoogle = createAsyncThunk(
  'firebase/signInWithGoogle',
  // As there is no argument in this we are using "_" in thunk as an unused payload (placeholder)
  async (_, { rejectWithValue }) => {
    try {
      const googleUser = await signInWithPopup(firebaseAuth, googleProvider);
      const user = googleUser.user;
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      };
    }
    catch(error){
      return rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  user: null,
};

export const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  // no reducers are needed while using asyncThunk
  reducers: {},
  // reducers for additional action types with builder callback
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserWithEmailAndPassword.pending, (state) => {
        state.error = null;
      })
      .addCase(signUpUserWithEmailAndPassword.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signUpUserWithEmailAndPassword.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(putData.fulfilled, (state, action) => {
        console.log(`Data stored at key ${action.payload.key}`);
      })
      .addCase(putData.rejected, (state, action) => {
        console.error(`Database Error: ${action.payload}`);
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.error = action.payload;
      })
  },
});

export default firebaseSlice.reducer;
