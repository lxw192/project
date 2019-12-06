import * as types from './../ActionTypes/ActionTypes'
import axios from 'axios';
import iStorage from "istorage"
import { change } from 'redux-form'
// import {HashRouter ,Router , Route, Link  } from 'react-router-dom';
import { message, Button } from 'antd';

export function register(data){
    console.log(data)
    return dispatch =>{
        axios.post('./register' , data ).then(data=>{
            if(data.data.code&&data.data.code>300){  
                message.info(data.data.message); 
            }else{
                window.location.href = '/'
            }
        })
    }
}
export function login(data){
    return dispatch =>{
        return axios.post('./login' , data ).then(data=>{
            if(data.data.code >=300){  
                message.info(data.data.message);
            }else{
                message.info(data.data.message);
                dispatch({
                    type:types.LOGIN,
                    loginData:data.data
                })
                window.sessionStorage.setItem('user_id' , data.data._id)
                window.sessionStorage.setItem('phone' , data.data.phone)
                dispatch(change('menu' , 'menuModal' , true ))
            }
            return data.data
        })
    }
}