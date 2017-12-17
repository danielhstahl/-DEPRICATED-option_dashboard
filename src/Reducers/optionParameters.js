const defaultState={
    numU:6,//gets raised to power of 2: 2^numU
    r:.03,
    T:.25,
    S0:50,
    sigma:.2,
    C:1.0,
    G:1.4,
    M:2.5,
    Y:.6,
    speed:.4,
    v0:1.05,
    adaV:.2,
    rho:-.5,
    k:[],
    quantile:.01
}
const optionParameters = (state = defaultState, action) => {
    //console.log(action)
    switch (action.type) {
        case 'UPDATE_OPTIONS':
            return {...state, [action.key]:action.value}
        default:
            return state
    }
}
  
export default optionParameters