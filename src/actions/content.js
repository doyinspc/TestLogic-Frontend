import axios from 'axios';
import { API_PATH } from './types';

import {
    CONTENT_GET,
    CONTENT_GET_ONE,
    CONTENT_GET_MULTIPLE,
    CONTENT_REGISTER_SUCCESS,
    CONTENT_REGISTER_FAIL,
    CONTENT_LOADING,
    CONTENT_LOADING_ERROR,
    CONTENT_ACTIVATE_FAIL,
    CONTENT_ACTIVATE_SUCCESS,
    CONTENT_UPDATE_SUCCESS,
    CONTENT_UPDATE_FAIL,
    CONTENT_DELETE_SUCCESS,
    CONTENT_DELETE_FAIL,
    CONTENT_EDIT,
    CONTENT_RESET,
    CONTENT_FORM,
    CONTENT_HIDE,
    CONTENT_DATAS
} from "../types/content";

const path = API_PATH;

export const getDatas = () => (dispatch, getState) => {
    let paths = `${path}/datas` 
    axios.get(paths, contentSetConfig(getState))
        .then(res => {
            dispatch({
                type: CONTENT_DATAS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CONTENT_LOADING_ERROR,
                payload: err
            })
        })
};

//GET ALL CONTENT 
export const getContents = (id) => (dispatch, getState) => {
        let paths = `${path}/content/ass/${id}` 
        console.log(paths)
        axios.get(paths, contentSetConfig(getState))
            .then(res => {
                dispatch({
                    type: CONTENT_GET_MULTIPLE,
                    payload: res.data,
                    ca: id
                })
            })
            .catch(err => {
                dispatch({
                    type : CONTENT_LOADING_ERROR,
                    payload: err
                })
            })
};
export const getContent = (num) => (dispatch, getState) => {
        let paths = `${path}/content/${num}` ;
        axios.get(paths, contentSetConfig(getState))
        .then(res => {
            dispatch({
                type: CONTENT_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : CONTENT_LOADING_ERROR,
                payload: err
            })
        })
};

//CONTENT REGISTER
export const registerContent = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/content/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            dispatch({
                type: CONTENT_GET_MULTIPLE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CONTENT_LOADING_ERROR,
                payload: err
            })
        })
};
//CONTENT EDIT/DELETE
export const updateContent = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/content/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: CONTENT_UPDATE_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type : CONTENT_UPDATE_FAIL,
                payload: err
            })
        })
};

//CONTENT DELETE
export const deleteContent = (id) => (dispatch, getState) =>{
    dispatch({type : CONTENT_LOADING});
    let paths = `${path}/content/${id}/set_delete` 
    axios.delete(paths, contentSetConfig(getState))
        .then(res => {
            dispatch({
                type: CONTENT_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CONTENT_DELETE_FAIL,
                payload : err
            })
        })
        
}

//CONTENT DELETE
export const toggleContent = (id) => (dispatch, getState) =>{
    dispatch({type : CONTENT_LOADING});
    let paths = `${path}/content/${id}/set_delete` 
    axios.delete(paths, contentSetConfig(getState))
        .then(res => {
            dispatch({
                type: CONTENT_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : CONTENT_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN CONTENT
export const activateContent = id => (dispatch) => {
    dispatch(
        {
        type : CONTENT_ACTIVATE_SUCCESS,
        payload: id
    });    
};

//ACTIVATE OR DEACTIVATE AN CONTENT
export const editContent = id => (dispatch) => {
    dispatch(
        {
        type : CONTENT_EDIT,
        payload: id
    });    
};



export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: CONTENT_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: CONTENT_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const contentSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
