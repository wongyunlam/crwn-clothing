import { createContext, useEffect, useReducer } from 'react'

import createAction from '../utils/reducer/reducer.utils'

import {
    onAuthStateChangedListener,
    createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
})

export const USER_INITIAL_STATE = {
    currentUser: null,
}

export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

export function userReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload,
            }

        default:
            return state
    }
}

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    // const value = { currentUser, setCurrentUser }

    const [value, dispatch] = useReducer(userReducer, USER_INITIAL_STATE)

    const { currentUser } = value

    const setCurrentUser = user => {
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener(user => {
            if (user) {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
