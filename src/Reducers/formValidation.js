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

const generateValidation=actionType=>(state=defaultFormValidationStatus, action)=>{
    switch (action.type) {
        case actionType:
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}
export const optionValidation=generateValidation('UPDATE_OPTION_VALIDATION')
export const hestonValidation=generateValidation('UPDATE_HESTON_VALIDATION')
export const bsValidation=generateValidation('UPDATE_BS_VALIDATION')
export const priceValidation=generateValidation('UPDATE_PRICE_VALIDATION')
export const strikeValidation=generateValidation('UPDATE_STRIKE_VALIDATION')
