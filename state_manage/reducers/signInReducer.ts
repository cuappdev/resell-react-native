
const initialState = {
    signedIn:false
}

const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                signedIn:action.payload.signedIn
            }
        case 'LOG_OUT':
            return {
                ...state,
                signedIn:action.payload.signedIn
            }
        default: 
            return state
    }
}

export default signInReducer;
