/**TODO!! THIS IS TEMPORARY!! USE React Router instead!! */
export const helpCarrMadan = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_CARR_MADAN_HELP':
            return action.isOpen
        default:
            return state
    }
}
export const helpFSTS = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_FSTS_HELP':
            console.log(state)
            return action.isOpen
        default:
            return state
    }
}
export const helpFangOost = (state = false, action) => {
    switch (action.type) {
        case 'TOGGLE_FANG_OOST_HELP':
            return action.isOpen
        default:
            return state
    }
}

