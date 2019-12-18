import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import register from './register'
import home from './home'

const rootReducer = combineReducers({
    form: formReducer,
    routerReducer,
    register,
    home,
});

export default rootReducer;