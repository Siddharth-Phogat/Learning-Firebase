import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, query, ref, set, get, child, onValue } from 'firebase/database';
import { getFirestore, addDoc, collection, doc, getDoc, where, getDocs, updateDoc } from 'firebase/firestore';

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

const firestore = getFirestore(firebaseApp);

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

export const writeDataInFirestore = createAsyncThunk(
  'firebase/writeDataInFirestore',
  async(_, {rejectWithValue}) => {
    try{
      const data = {
        name: "New Delhi",
        pinCode: 9887,
        lat: 152,
        long: 7898,
      }
      const firestoreAddData = await addDoc(collection(firestore, "cities"), data);
      // console.log(firestoreAddData);
      return {
        id: firestoreAddData.id,
        ...data,
      };
    } catch(error){
      return rejectWithValue(error.message);
    }
  }
);

export const getDocumentFromFirebase = createAsyncThunk(
  'firebase/getDocumentFromFirebase',
  async(_, {rejectWithValue}) => {
    try{
      const ref = doc(firestore, "users", "xbgXTh38AH0U200EaBQd");
      const snapshot = await getDoc(ref);
      console.log(snapshot.data());
      return snapshot.data();
    } catch (error){
      return rejectWithValue(error.message);
    }
  }
);

export const getDocumentByQuery = createAsyncThunk(
  'firebase/getDocumentByQuery', 
  async(_, {rejectWithValue}) =>{
    try{
      const collectionRef = collection(firestore, "users");
      const q = query(collectionRef, where("isMale", "==", true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((data)=>console.log(data.data()));
    } catch(error){
      return rejectWithValue(error.message);
    }
  }
);

export const updateInFirestore = createAsyncThunk(
  'firebase/updateInFirestore',
  async(_,{rejectWithValue}) => {
    try{
      const docRef = doc(firestore, "users", "KcDxOXMHBJc5l6nRLr5D");
      await updateDoc(docRef, {
        Name: "Siddharth Phogat"
      })
    } catch(error){
      return rejectWithValue(error.message);
    }
  }
); // Same for delete

export const putDataInRealTimeDb = createAsyncThunk(
  'firebase/putDataInRealTimeDb',
  async(_,{rejectWithValue, dispatch}) => {
    try{
      const result = await dispatch(putData({key: "grandfather/father/child", data: {id: 1, Name: "Sid", Age: 22}}));
      console.log("Reached: ", result);
    } catch(error){
      return rejectWithValue(error.message);
    }
  }
);

export const getdataFromRealTimeDb = createAsyncThunk(
  'firebase/getdataFromRealTimeDb',
  async(_, {rejectWithValue}) => {
    try{
      const snapshot = await get(child(ref(firebaseDatabase), "grandfather/father"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        return data;
      }

    } catch(error){
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
      .addCase(writeDataInFirestore.fulfilled, (state, action) => {
        console.log("Data stored:" , JSON.stringify(action.payload));
      })
      .addCase(writeDataInFirestore.rejected, (state, action) => {
        console.log("Database Error: ", JSON.stringify(action.payload));
      })
      .addCase(getDocumentFromFirebase.fulfilled, (state, action) => {
        console.log("Data: ", JSON.stringify(action.payload));
      })
      .addCase(getDocumentByQuery.fulfilled, (state, action) => {
      })
      .addCase(updateInFirestore.fulfilled, (state, action) => {
      })
      .addCase(putDataInRealTimeDb.fulfilled, (state, action) => {
      })
      .addCase(getdataFromRealTimeDb.fulfilled, (state, action) => {
      })
  },
});

export default firebaseSlice.reducer;
