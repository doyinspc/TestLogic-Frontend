import axios from 'axios';
import { API_PATH } from './types';

import {
    THEME_GET,
    THEME_GET_ONE,
    THEME_GET_MULTIPLE,
    THEME_REGISTER_SUCCESS,
    THEME_REGISTER_FAIL,
    THEME_LOADING,
    THEME_LOADING_ERROR,
    THEME_ACTIVATE_FAIL,
    THEME_ACTIVATE_SUCCESS,
    THEME_UPDATE_SUCCESS,
    THEME_UPDATE_FAIL,
    THEME_DELETE_SUCCESS,
    THEME_DELETE_FAIL,
    THEME_EDIT,
    THEME_RESET,
    THEME_FORM,
    THEME_HIDE,
    THEME_DATAS
} from "../types/theme";

const path = API_PATH;

//GET ALL THEME 
export const getThemes = (id) => (dispatch, getState) => {
        let paths = `${path}/theme/cat/${id}` 
        axios.get(paths, themeSetConfig(getState))
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: THEME_GET_MULTIPLE,
                    payload: res.data,
                    subject: id
                })
            })
            .catch(err => {
                dispatch({
                    type : THEME_LOADING_ERROR,
                    payload: err
                })
            })
};
export const getTheme = (num) => (dispatch, getState) => {
        let paths = `${path}/theme/${num}` ;
        axios.get(paths, themeSetConfig(getState))
        .then(res => {
            dispatch({
                type: THEME_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : THEME_LOADING_ERROR,
                payload: err
            })
        })
};

//THEME REGISTER
export const registerTheme = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/theme/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            let newdata = data;
            newdata['id'] = res.insertId;
            dispatch({
                type: THEME_REGISTER_SUCCESS,
                payload: newdata
            })
        })
        .catch(err => {
            dispatch({
                type : THEME_LOADING_ERROR,
                payload: err
            })
        })
};
//THEME EDIT/DELETE
export const updateTheme = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/theme/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: THEME_UPDATE_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type : THEME_UPDATE_FAIL,
                payload: err
            })
        })
};

//THEME DELETE
export const deleteTheme = (id) => (dispatch, getState) =>{
    dispatch({type : THEME_LOADING});
    let paths = `${path}/theme/${id}/set_delete` 
    axios.delete(paths, themeSetConfig(getState))
        .then(res => {
            dispatch({
                type: THEME_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : THEME_DELETE_FAIL,
                payload : err
            })
        })
        
}

//THEME DELETE
export const toggleTheme = (id) => (dispatch, getState) =>{
    dispatch({type : THEME_LOADING});
    let paths = `${path}/theme/${id}/set_delete` 
    axios.delete(paths, themeSetConfig(getState))
        .then(res => {
            dispatch({
                type: THEME_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : THEME_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN THEME
export const editTheme = id => (dispatch) => {
    dispatch(
        {
        type : THEME_EDIT,
        payload: id
    });    
};


export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: THEME_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: THEME_HIDE
            })
};

export const activateTheme = id => (dispatch) => {
    dispatch(
        {
        type : THEME_ACTIVATE_SUCCESS,
        payload: id
    });    
};

//SET TOKEN AND HEADER - HELPER FUNCTION
export const themeSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
