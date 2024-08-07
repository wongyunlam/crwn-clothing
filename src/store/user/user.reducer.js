const INITIAL_STATE = {
    currentUser: null,
}

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

function userReducer(state = INITIAL_STATE, action) {
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

export { INITIAL_STATE, USER_ACTION_TYPES, userReducer }
