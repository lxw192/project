import * as types from './../ActionTypes/ActionTypes'


const Home = (state={} , action)=>{
    console.log(state , action)
    switch (action.type) {
        case 'GET_HOUSE_LIST':
            return { ...state , house_list: action.house_list }
            break;
            default:
                return state
    }
}
export default Home