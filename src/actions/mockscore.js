import axios from 'axios';
import { API_PATH } from './types';

import {
    MOCKSCORE_GET,
    MOCKSCORE_GET_ONE,
    MOCKSCORE_GET_MULTIPLE,
    MOCKSCORE_GET_MULTIPLE_SEC,
    MOCKSCORE_REGISTER_SUCCESS,
    MOCKSCORE_REGISTER_FAIL,
    MOCKSCORE_LOADING,
    MOCKSCORE_LOADING_ERROR,
    MOCKSCORE_ACTIVATE_FAIL,
    MOCKSCORE_ACTIVATE_SUCCESS,
    MOCKSCORE_UPDATE_SUCCESS,
    MOCKSCORE_UPDATE_FAIL,
    MOCKSCORE_DELETE_SUCCESS,
    MOCKSCORE_DELETE_FAIL,
    MOCKSCORE_EDIT,
    MOCKSCORE_RESET,
    MOCKSCORE_FORM,
    MOCKSCORE_HIDE,
    MOCKSCORE_DATAS
} from "../types/mockscore";

const path = API_PATH;

//GET ALL MOCKSCORE 
export const getMockscores = (id) => (dispatch, getState) => {
        let paths = `${path}/mockscore/cat/${id}` 
        axios.get(paths, mockscoreSetConfig(getState))
            .then(res => {
                dispatch({
                    type: MOCKSCORE_GET_MULTIPLE,
                    payload: res.data,
                    topic: id
                })
            })
            .catch(err => {
                dispatch({
                    type : MOCKSCORE_LOADING_ERROR,
                    payload: err
                })
            })
};
//GET ALL MOCKSCORE 
export const getMockscoresList = (id) => (dispatch, getState) => {
    let paths = `${path}/mockscore/cat/${id}` 
    axios.get(paths, mockscoreSetConfig(getState))
        .then(res => {
            dispatch({
                type: MOCKSCORE_GET_MULTIPLE_SEC,
                payload: res.data,
                topic: id
            })
        })
        .catch(err => {
            dispatch({
                type : MOCKSCORE_LOADING_ERROR,
                payload: err
            })
        })
};
export const getMockscore = (num) => (dispatch, getState) => {
        let paths = `${path}/mockscore/${num}` ;
        axios.get(paths, mockscoreSetConfig(getState))
        .then(res => {
            dispatch({
                type: MOCKSCORE_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : MOCKSCORE_LOADING_ERROR,
                payload: err
            })
        })
};

//MOCKSCORE REGISTER
export const registerMockscore = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/mockscore/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            dispatch({
                type: MOCKSCORE_GET_MULTIPLE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MOCKSCORE_LOADING_ERROR,
                payload: err
            })
        })
};
//MOCKSCORE EDIT
export const updateMockscore = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/mockscore/update/${id}` 
    let body =  JSON.stringify(data);
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: MOCKSCORE_UPDATE_SUCCESS,
                payload: res.data[0]
            })
        })
        .catch(err => {
            dispatch({
                type : MOCKSCORE_UPDATE_FAIL,
                payload: err
            })
        })
};

//MOCKSCORE EDIT/DELETE
export const groupMockscore = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/mockscore/group/${id}` 
    let body =  JSON.stringify({grp:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : MOCKSCORE_UPDATE_FAIL,
                payload: err
            })
        })
};

// MOVE MOCKSCORE 
export const moveMockscore = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/mockscore/move/${id}` 
    let body =  JSON.stringify({mockscoreID:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : MOCKSCORE_UPDATE_FAIL,
                payload: err
            })
        })
};


//MOCKSCORE DELETE
export const deleteMockscore = (id) => (dispatch, getState) =>{
    dispatch({type : MOCKSCORE_LOADING});
    let paths = `${path}/mockscore/${id}/set_delete` 
    axios.delete(paths, mockscoreSetConfig(getState))
        .then(res => {
            dispatch({
                type: MOCKSCORE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MOCKSCORE_DELETE_FAIL,
                payload : err
            })
        })
        
}

//MOCKSCORE DELETE
export const toggleMockscore = (id) => (dispatch, getState) =>{
    dispatch({type : MOCKSCORE_LOADING});
    let paths = `${path}/mockscore/${id}/set_delete` 
    axios.delete(paths, mockscoreSetConfig(getState))
        .then(res => {
            dispatch({
                type: MOCKSCORE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MOCKSCORE_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN MOCKSCORE
export const editMockscore = id => (dispatch) => {
    dispatch(
        {
        type : MOCKSCORE_EDIT,
        payload: id
    });    
};

export const activateMockscore = id => (dispatch) => {
    dispatch(
        {
        type : MOCKSCORE_ACTIVATE_SUCCESS,
        payload: id
    });    
};

export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: MOCKSCORE_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: MOCKSCORE_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const mockscoreSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
