import axios from 'axios';
import { API_PATH } from './types';

import {
    USER_GET,
    USER_GET_ONE,
    USER_GET_MULTIPLE,
    USER_GET_MULTIPLE_SEC,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOADING,
    USER_LOADING_ERROR,
    USER_ACTIVATE_FAIL,
    USER_ACTIVATE_SUCCESS,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_EDIT,
    USER_RESET,
    USER_FORM,
    USER_HIDE,
    USER_DATAS
} from "../types/user";

const path = API_PATH;

//GET ALL USER 
export const getUsers = (id) => (dispatch, getState) => {
        let paths = `${path}/user/cat/${id}` 
        axios.get(paths, userSetConfig(getState))
            .then(res => {
                dispatch({
                    type: USER_GET_MULTIPLE,
                    payload: res.data,
                    topic: id
                })
            })
            .catch(err => {
                dispatch({
                    type : USER_LOADING_ERROR,
                    payload: err
                })
            })
};
//GET ALL USER 
export const getUsersList = (id) => (dispatch, getState) => {
    let paths = `${path}/user/cat/${id}` 
    axios.get(paths, userSetConfig(getState))
        .then(res => {
            dispatch({
                type: USER_GET_MULTIPLE_SEC,
                payload: res.data,
                topic: id
            })
        })
        .catch(err => {
            dispatch({
                type : USER_LOADING_ERROR,
                payload: err
            })
        })
};
export const getUser = (num) => (dispatch, getState) => {
        let paths = `${path}/user/${num}` ;
        axios.get(paths, userSetConfig(getState))
        .then(res => {
            dispatch({
                type: USER_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : USER_LOADING_ERROR,
                payload: err
            })
        })
};

//USER REGISTER
export const registerUser = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/user/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            dispatch({
                type: USER_GET_MULTIPLE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USER_LOADING_ERROR,
                payload: err
            })
        })
};
//USER EDIT
export const updateUser = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/user/update/${id}` 
    let body =  JSON.stringify(data);
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: res.data[0]
            })
        })
        .catch(err => {
            dispatch({
                type : USER_UPDATE_FAIL,
                payload: err
            })
        })
};

//USER EDIT/DELETE
export const groupUser = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/user/group/${id}` 
    let body =  JSON.stringify({grp:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : USER_UPDATE_FAIL,
                payload: err
            })
        })
};

// MOVE USER 
export const moveUser = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/user/move/${id}` 
    let body =  JSON.stringify({userID:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : USER_UPDATE_FAIL,
                payload: err
            })
        })
};


//USER DELETE
export const deleteUser = (id) => (dispatch, getState) =>{
    dispatch({type : USER_LOADING});
    let paths = `${path}/user/${id}/set_delete` 
    axios.delete(paths, userSetConfig(getState))
        .then(res => {
            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USER_DELETE_FAIL,
                payload : err
            })
        })
        
}

//USER DELETE
export const toggleUser = (id) => (dispatch, getState) =>{
    dispatch({type : USER_LOADING});
    let paths = `${path}/user/${id}/set_delete` 
    axios.delete(paths, userSetConfig(getState))
        .then(res => {
            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USER_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN USER
export const editUser = id => (dispatch) => {
    dispatch(
        {
        type : USER_EDIT,
        payload: id
    });    
};

export const activateUser = id => (dispatch) => {
    dispatch(
        {
        type : USER_ACTIVATE_SUCCESS,
        payload: id
    });    
};

export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: USER_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: USER_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const userSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
