import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC93lFrpMOjhX1Krpmwx9lKGNVoFmQpM_E',
  authDomain: 'cms-ticketsale-224e5.firebaseapp.com',
  projectId: 'cms-ticketsale-224e5',
  storageBucket: 'cms-ticketsale-224e5.appspot.com',
  messagingSenderId: '768485106724',
  appId: '1:768485106724:web:1689c50071f4c356c2a4b1',
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
