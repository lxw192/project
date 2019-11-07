import * as types from './ActionTypes'
import axios from 'axios';
import iStorage from "istorage"
// import {HashRouter ,Router , Route, Link  } from 'react-router-dom';
import { message, Button } from 'antd';

export function register(data){
    console.log(data)
    return dispatch =>{
        axios.post('./register' , data ).then(data=>{
            if(data.data.code==200){  
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
                console.log()
                dispatch({
                    type:types.LOGIN,
                    loginData:data.data
                })
                window.sessionStorage.setItem('user_id' , data.data._id)
                window.sessionStorage.setItem('phone' , data.data.phone)
                // window.location.href = '#/menu/home'
            }
            return data
        })
    }
}