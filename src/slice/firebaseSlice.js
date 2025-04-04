import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Initialize Firebase Services
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);

// Initial State
const initialState = {
  user: null,
};

// using asyncThunk for signup
export const signUpUserWithEmailAndPassword = createAsyncThunk(
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
      });
  },
});

export default firebaseSlice.reducer;
