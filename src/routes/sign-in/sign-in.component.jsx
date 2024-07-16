import './sign-in.styles.scss'

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

export default function SignIn() {
    const loginWithGoogle = async () => {
        const response = await signInWithGooglePopup()

        const userDocRef = await createUserDocumentFromAuth(response.user)
    }

    return (
        <div>
            <div c>
                <h1>sign-in</h1>
                <button onClick={loginWithGoogle}>Sign In with Google</button>
            </div>
            <div>
                <SignUpForm />
            </div>
        </div>
    )
}
