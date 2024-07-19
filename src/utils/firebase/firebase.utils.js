import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBtO1urPXdm34sEPzcgXAMYmIIo-JsKOYw',
    authDomain: 'crwn-clothing-db-94d7a.firebaseapp.com',
    projectId: 'crwn-clothing-db-94d7a',
    storageBucket: 'crwn-clothing-db-94d7a.appspot.com',
    messagingSenderId: '859475393739',
    appId: '1:859475393739:web:e3ee931e3becae54d6af4e',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
    prompt: 'select_account',
})

const auth = getAuth()
const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

const db = getFirestore()

const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
) => {
    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    return userDocRef
}

const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}

const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
}

const signOutUser = async () => await signOut(auth)

const onAuthStateChangedListener = callback => {
    onAuthStateChanged(auth, callback)
}

export {
    auth,
    db,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    createAuthUserWithEmailAndPassword,
    signInAuthUserWithEmailAndPassword,
    signOutUser,
    onAuthStateChangedListener,
}
