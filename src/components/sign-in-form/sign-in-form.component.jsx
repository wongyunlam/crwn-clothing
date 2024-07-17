import './sign-in-form.styles.scss'

import { useState } from 'react'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    email: '',
    password: '',
}

export default function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetForm = () => {
        setFormFields(() => defaultFormFields)
    }

    const handleChange = e => {
        const { name, value } = e.target

        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        console.log('response')

        try {
            const response = await signInAuthUserWithEmailAndPassword(
                email,
                password
            )

            console.log(response)
            resetForm()
        } catch (error) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    alert('incorrect password or email')
                    break
                default:
                    console.log(error)
            }
        }
    }

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithGooglePopup()
            if (result && result.user) {
                // 成功處理
                const user = result.user
                await createUserDocumentFromAuth(user)
                console.log('User signed in:', user)
            } else {
                console.error('No user information found in the result.')
            }
        } catch (error) {
            // 無視 auth/popup-closed-by-user 錯誤
            if (error.code !== 'auth/popup-closed-by-user') {
                console.error('An error occurred:', error.message)
            }
        }
    }

    return (
        <div className='sign-in-container '>
            <h2>I already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    inputOptions={{
                        name: 'email',
                        type: 'email',
                        value: email,
                        onChange: handleChange,
                        required: true,
                    }}
                />
                <FormInput
                    label='Password'
                    inputOptions={{
                        name: 'password',
                        type: 'password',
                        value: password,
                        onChange: handleChange,
                        required: true,
                    }}
                />
                <div className='buttons-container'>
                    <Button type='submit'>SIGN IN</Button>
                    <Button
                        type='button'
                        buttonType={'google'}
                        onClick={signInWithGoogle}>
                        GOOGLE SIGN IN
                    </Button>
                </div>
            </form>
        </div>
    )
}
