import * as types from './../ActionTypes/ActionTypes'
import axios from 'axios';
import { message } from 'antd'
import { reduxForm, submit, getFormValues, Form , formValueSelector , change } from 'redux-form'
export function getLoadInfo(values){
    return dispatch =>{
        return axios.get('/loadinfo?phone=' + values).then(data => {
            dispatch({
                type: types.LOGIN,
                loginData: data.data
            })
        })
    }
}
export function updateInformation(values){
    return dispatch =>{
        return axios.put(`/personal/information/${values._id}` ,{...values} ).then(data => {
            dispatch(change('menu' , 'modalLock' , false ))
            dispatch({
                type: types.LOGIN,
                loginData: data.data
            })
        })
    }
} 
export function file_upload(values){
    return dispatch =>{
        return  axios.post(`/uploader` , values ).then(data => {
            dispatch(change('home','url' , data.data.url))
        })
    }
} 
