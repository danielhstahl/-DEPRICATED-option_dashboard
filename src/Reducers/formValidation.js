const defaultFormValidationStatus={
    numU:'',
    r:'',
    T:'',
    S0:'',
    sigma:'',
    C:'',
    G:'',
    M:'',
    Y:'',
    speed:'',
    v0:'',
    adaV:'',
    rho:'',
    k:'',
    quantile:''
}

export default (state = defaultFormValidationStatus, action) => {
    switch (action.type) {
        case 'UPDATE_VALIDATION_STATUS':
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}