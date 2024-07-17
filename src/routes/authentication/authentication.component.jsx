import './authentication.styles.scss'

import { useState } from 'react'

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'
import SignInForm from '../../components/sign-in-form/sign-in-form.component'

export default function SignIn() {
    const loginWithGoogle = async () => {
        const response = await signInWithGooglePopup()

        const userDocRef = await createUserDocumentFromAuth(response.user)
    }

    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}
