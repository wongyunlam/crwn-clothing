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

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(
                email,
                password
            )

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

    const signInWithGoogle = async () => await signInWithGooglePopup()

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
