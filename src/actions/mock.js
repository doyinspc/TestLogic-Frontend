import axios from 'axios';
import { API_PATH } from './types';

import {
    MOCK_GET,
    MOCK_GET_ONE,
    MOCK_GET_MULTIPLE,
    MOCK_GET_MULTIPLE_SEC,
    MOCK_REGISTER_SUCCESS,
    MOCK_REGISTER_FAIL,
    MOCK_LOADING,
    MOCK_LOADING_ERROR,
    MOCK_ACTIVATE_FAIL,
    MOCK_ACTIVATE_SUCCESS,
    MOCK_UPDATE_SUCCESS,
    MOCK_UPDATE_FAIL,
    MOCK_DELETE_SUCCESS,
    MOCK_DELETE_FAIL,
    MOCK_EDIT,
    MOCK_RESET,
    MOCK_FORM,
    MOCK_HIDE,
    MOCK_DATAS
} from "../types/mock";

const path = API_PATH;

//GET ALL MOCK 
export const getMocks = (id) => (dispatch, getState) => {
        let paths = `${path}/mock/cat/${id}` 
        axios.get(paths, mockSetConfig(getState))
            .then(res => {
                dispatch({
                    type: MOCK_GET_MULTIPLE,
                    payload: res.data,
                    topic: id
                })
            })
            .catch(err => {
                dispatch({
                    type : MOCK_LOADING_ERROR,
                    payload: err
                })
            })
};
//GET ALL MOCK 
export const getMocksList = (id) => (dispatch, getState) => {
    let paths = `${path}/mock/cat/${id}` 
    axios.get(paths, mockSetConfig(getState))
        .then(res => {
            dispatch({
                type: MOCK_GET_MULTIPLE_SEC,
                payload: res.data,
                topic: id
            })
        })
        .catch(err => {
            dispatch({
                type : MOCK_LOADING_ERROR,
                payload: err
            })
        })
};
export const getMock = (num) => (dispatch, getState) => {
        let paths = `${path}/mock/${num}` ;
        axios.get(paths, mockSetConfig(getState))
        .then(res => {
            dispatch({
                type: MOCK_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : MOCK_LOADING_ERROR,
                payload: err
            })
        })
};

//MOCK REGISTER
export const registerMock = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/mock/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            dispatch({
                type: MOCK_GET_MULTIPLE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MOCK_LOADING_ERROR,
                payload: err
            })
        })
};
//MOCK EDIT
export const updateMock = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/mock/update/${id}` 
    let body =  JSON.stringify(data);
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: MOCK_UPDATE_SUCCESS,
                payload: res.data[0]
            })
        })
        .catch(err => {
            dispatch({
                type : MOCK_UPDATE_FAIL,
                payload: err
            })
        })
};

//MOCK EDIT/DELETE
export const groupMock = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/mock/group/${id}` 
    let body =  JSON.stringify({grp:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : MOCK_UPDATE_FAIL,
                payload: err
            })
        })
};

// MOVE MOCK 
export const moveMock = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/mock/move/${id}` 
    let body =  JSON.stringify({mockID:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : MOCK_UPDATE_FAIL,
                payload: err
            })
        })
};


//MOCK DELETE
export const deleteMock = (id) => (dispatch, getState) =>{
    dispatch({type : MOCK_LOADING});
    let paths = `${path}/mock/${id}/set_delete` 
    axios.delete(paths, mockSetConfig(getState))
        .then(res => {
            dispatch({
                type: MOCK_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MOCK_DELETE_FAIL,
                payload : err
            })
        })
        
}

//MOCK DELETE
export const toggleMock = (id) => (dispatch, getState) =>{
    dispatch({type : MOCK_LOADING});
    let paths = `${path}/mock/${id}/set_delete` 
    axios.delete(paths, mockSetConfig(getState))
        .then(res => {
            dispatch({
                type: MOCK_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : MOCK_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN MOCK
export const editMock = id => (dispatch) => {
    dispatch(
        {
        type : MOCK_EDIT,
        payload: id
    });    
};

export const activateMock = id => (dispatch) => {
    dispatch(
        {
        type : MOCK_ACTIVATE_SUCCESS,
        payload: id
    });    
};

export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: MOCK_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: MOCK_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const mockSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
