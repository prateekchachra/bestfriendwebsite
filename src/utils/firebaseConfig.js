import {firebaseConfig} from '../assets/firebase-config'
import firebase from 'firebase';


const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;