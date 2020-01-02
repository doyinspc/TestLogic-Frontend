import axios from 'axios';
import { API_PATH } from './types';

import {
    OBJECTIVE_GET,
    OBJECTIVE_GET_ONE,
    OBJECTIVE_GET_MULTIPLE,
    OBJECTIVE_REGISTER_SUCCESS,
    OBJECTIVE_REGISTER_FAIL,
    OBJECTIVE_LOADING,
    OBJECTIVE_LOADING_ERROR,
    OBJECTIVE_ACTIVATE_FAIL,
    OBJECTIVE_ACTIVATE_SUCCESS,
    OBJECTIVE_UPDATE_SUCCESS,
    OBJECTIVE_UPDATE_FAIL,
    OBJECTIVE_DELETE_SUCCESS,
    OBJECTIVE_DELETE_FAIL,
    OBJECTIVE_EDIT,
    OBJECTIVE_RESET,
    OBJECTIVE_FORM,
    OBJECTIVE_HIDE,
    OBJECTIVE_DATAS
} from "../types/objective";

const path = API_PATH;

export const getDatas = () => (dispatch, getState) => {
    let paths = `${path}/datas` 
    axios.get(paths, objectiveSetConfig(getState))
        .then(res => {
            dispatch({
                type: OBJECTIVE_DATAS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : OBJECTIVE_LOADING_ERROR,
                payload: err
            })
        })
};

//GET ALL OBJECTIVE 
export const getObjectives = (id) => (dispatch, getState) => {
        let paths = `${path}/objective/ass/${id}` 
        console.log(paths)
        axios.get(paths, objectiveSetConfig(getState))
            .then(res => {
                dispatch({
                    type: OBJECTIVE_GET_MULTIPLE,
                    payload: res.data,
                    ca: id
                })
            })
            .catch(err => {
                dispatch({
                    type : OBJECTIVE_LOADING_ERROR,
                    payload: err
                })
            })
};
export const getObjective = (num) => (dispatch, getState) => {
        let paths = `${path}/objective/${num}` ;
        axios.get(paths, objectiveSetConfig(getState))
        .then(res => {
            dispatch({
                type: OBJECTIVE_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : OBJECTIVE_LOADING_ERROR,
                payload: err
            })
        })
};

//OBJECTIVE REGISTER
export const registerObjective = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/objective/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            dispatch({
                type: OBJECTIVE_GET_MULTIPLE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : OBJECTIVE_LOADING_ERROR,
                payload: err
            })
        })
};
//OBJECTIVE EDIT/DELETE
export const updateObjective = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/objective/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: OBJECTIVE_UPDATE_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type : OBJECTIVE_UPDATE_FAIL,
                payload: err
            })
        })
};

//OBJECTIVE DELETE
export const deleteObjective = (id) => (dispatch, getState) =>{
    dispatch({type : OBJECTIVE_LOADING});
    let paths = `${path}/objective/${id}/set_delete` 
    axios.delete(paths, objectiveSetConfig(getState))
        .then(res => {
            dispatch({
                type: OBJECTIVE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : OBJECTIVE_DELETE_FAIL,
                payload : err
            })
        })
        
}

//OBJECTIVE DELETE
export const toggleObjective = (id) => (dispatch, getState) =>{
    dispatch({type : OBJECTIVE_LOADING});
    let paths = `${path}/objective/${id}/set_delete` 
    axios.delete(paths, objectiveSetConfig(getState))
        .then(res => {
            dispatch({
                type: OBJECTIVE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : OBJECTIVE_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN OBJECTIVE
export const editObjective = id => (dispatch) => {
    dispatch(
        {
        type : OBJECTIVE_EDIT,
        payload: id
    });    
};


export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: OBJECTIVE_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: OBJECTIVE_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const objectiveSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
