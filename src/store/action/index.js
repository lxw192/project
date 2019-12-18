import * as types from './../ActionTypes/ActionTypes'
import axios from 'axios';
import { message } from 'antd'
import { reduxForm, submit, getFormValues, Form , formValueSelector , change } from 'redux-form'

export function get_house_list(values){
    return dispatch =>{
        return axios.get('/house_list'+`${values?values:''}`).then(data => {
            console.log(data)
            dispatch({
                type:types.GET_HOUSE_LIST,
                house_list:data.data.data
            })
        })
    }
}
export function creat_house_list(values){
    return dispatch =>{
        return axios.get('/creat_house_list').then(data => {
            console.log(data)
        })
    }
}