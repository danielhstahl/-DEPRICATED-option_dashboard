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
    meanVol:'',
    v0:'',
    adaV:'',
    rho:'',
    k:'',
    quantile:''
}

export const optionValidation=(state = defaultFormValidationStatus, action) => {
    switch (action.type) {
        case 'UPDATE_OPTION_VALIDATION':
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}
export const hestonValidation=(state = defaultFormValidationStatus, action) => {
    switch (action.type) {
        case 'UPDATE_HESTON_VALIDATION':
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}
export const bsValidation=(state = defaultFormValidationStatus, action) => {
    switch (action.type) {
        case 'UPDATE_BS_VALIDATION':
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}