import './sign-up-form.styles.scss'

import { useState } from 'react'
import { UserContext } from '../../context/user.context'

import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'

import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

export default function SignUpForm() {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetForm = () => {
        setFormFields(() => defaultFormFields)
    }

    const handleChange = e => {
        const { name, value } = e.target

        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        if (password !== confirmPassword) return alert('Passwords do not match')

        try {
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            )

            await createUserDocumentFromAuth(user, { displayName })

            resetForm()
        } catch (error) {
            if (error.code === 'auth/email-already-in-use')
                return alert('Cannot create user, email already in use')

            console.log('user creation encountered an error', error)
        }
    }

    return (
        <div className='sign-up-container '>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Display Name'
                    inputOptions={{
                        name: 'displayName',
                        type: 'text',
                        value: displayName,
                        onChange: handleChange,
                        required: true,
                    }}
                />
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
                <FormInput
                    label='Confirm Password'
                    inputOptions={{
                        name: 'confirmPassword',
                        type: 'password',
                        value: confirmPassword,
                        onChange: handleChange,
                        required: true,
                    }}
                />
                <Button type='submit'>SIGN UP</Button>
            </form>
        </div>
    )
}
