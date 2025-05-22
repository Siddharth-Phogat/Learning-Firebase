# learning-firebase

A simple React repo to learn and practice Firebase Authentication, Firestore, and Realtime Database integration using Redux Toolkit and Firebase SDK.

## Features

- User Sign Up with Email and Password
- User Login with Email and Password
- Google Sign-In Authentication
- Storing and retrieving data from Firebase Realtime Database
- Writing, reading, and updating data in Firestore
- Redux Toolkit for state management and async Firebase operations
- Tailwind CSS for styling

## Technologies Used

- React
- Redux Toolkit
- Firebase Authentication
- Firebase Realtime Database
- Firestore (Firebase Cloud Firestore)
- Tailwind CSS

## Setup Instructions

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/learning-firebase.git
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a Firebase project and enable Authentication, Firestore, and Realtime Database.

4. Add your Firebase config in `.env` file (use Vite environment variables format):

   ```ini
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_DATABASE_URL=your_database_url
   ```

5. Start the development server

   ```bash
   npm run dev
   ```

## Notes

- This project is intended for learning purposes and is kept simple.
- Feel free to extend it with more Firebase features and UI improvements.

---

Made by Siddharth Phogat
