
const initialState = {
    signedIn:false
}

const signInReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                signedIn:action.payload
            }
        case 'LOG_OUT':
            return {
                ...state,
                signedIn:action.payload
            }
        default: 
            return state
    }
}

export default signInReducer;
