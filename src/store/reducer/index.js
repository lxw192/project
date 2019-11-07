import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import register from './register'

const rootReducer = combineReducers({
    form: formReducer,
    routerReducer,
    register,
});

export default rootReducer;