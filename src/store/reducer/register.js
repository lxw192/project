import * as types from './../ActionTypes/ActionTypes'

let init = {
    number:10
}
const Reducers = (state=init , action)=>{
    switch (action.type) {
        case 'add':
            return { ...state , number: state.number + 1 }
            break
        case 'minus':
            return { ...state , number: state.number - 1 };
            break
        case types.LOGIN:
            return Object.assign( {} , state , {
                loginData : action.loginData
            } )
            break
            default:
                return state
    }
}
export default Reducers