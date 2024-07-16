import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

export default function SignIn() {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup()
        console.log(response)

        const userDocRef = await createUserDocumentFromAuth(response.user)

        console.log(userDocRef)
    }

    return (
        <div>
            <h1>sign-in</h1>
            <button onClick={logGoogleUser}>Sign In with Google Popup</button>
        </div>
    )
}
