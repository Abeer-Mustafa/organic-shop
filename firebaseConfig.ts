import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { environment } from './src/environments/environment';

// Initialize Firebase
export const app = initializeApp(environment.firebase);
export const auth = getAuth(app);
