import axios from 'axios';
import { API_PATH } from './types';

import {
    TEST_GET,
    TEST_GET_ONE,
    TEST_GET_MULTIPLE,
    TEST_GET_MULTIPLE_SEC,
    TEST_REGISTER_SUCCESS,
    TEST_REGISTER_FAIL,
    TEST_LOADING,
    TEST_LOADING_ERROR,
    TEST_ACTIVATE_FAIL,
    TEST_ACTIVATE_SUCCESS,
    TEST_UPDATE_SUCCESS,
    TEST_UPDATE_FAIL,
    TEST_DELETE_SUCCESS,
    TEST_DELETE_FAIL,
    TEST_EDIT,
    TEST_RESET,
    TEST_FORM,
    TEST_HIDE,
    TEST_DATAS
} from "../types/test";

const path = API_PATH;

//GET ALL TEST 
export const getTests = (id) => (dispatch, getState) => {
        let paths = `${path}/test/cat/${id}` 
        axios.get(paths, testSetConfig(getState))
            .then(res => {
                dispatch({
                    type: TEST_GET_MULTIPLE,
                    payload: res.data,
                    topic: id
                })
            })
            .catch(err => {
                dispatch({
                    type : TEST_LOADING_ERROR,
                    payload: err
                })
            })
};
//GET ALL TEST 
export const getTestsList = (id) => (dispatch, getState) => {
    let paths = `${path}/test/cat/${id}` 
    axios.get(paths, testSetConfig(getState))
        .then(res => {
            dispatch({
                type: TEST_GET_MULTIPLE_SEC,
                payload: res.data,
                topic: id
            })
        })
        .catch(err => {
            dispatch({
                type : TEST_LOADING_ERROR,
                payload: err
            })
        })
};
export const getTest = (num) => (dispatch, getState) => {
        let paths = `${path}/test/${num}` ;
        axios.get(paths, testSetConfig(getState))
        .then(res => {
            dispatch({
                type: TEST_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : TEST_LOADING_ERROR,
                payload: err
            })
        })
};

//TEST REGISTER
export const registerTest = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/test/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            dispatch({
                type: TEST_GET_MULTIPLE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : TEST_LOADING_ERROR,
                payload: err
            })
        })
};
//TEST EDIT
export const updateTest = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/test/update/${id}` 
    let body =  JSON.stringify(data);
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: TEST_UPDATE_SUCCESS,
                payload: res.data[0]
            })
        })
        .catch(err => {
            dispatch({
                type : TEST_UPDATE_FAIL,
                payload: err
            })
        })
};

//TEST EDIT/DELETE
export const groupTest = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/test/group/${id}` 
    let body =  JSON.stringify({grp:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : TEST_UPDATE_FAIL,
                payload: err
            })
        })
};

// MOVE TEST 
export const moveTest = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/test/move/${id}` 
    let body =  JSON.stringify({testID:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : TEST_UPDATE_FAIL,
                payload: err
            })
        })
};


//TEST DELETE
export const deleteTest = (id) => (dispatch, getState) =>{
    dispatch({type : TEST_LOADING});
    let paths = `${path}/test/${id}/set_delete` 
    axios.delete(paths, testSetConfig(getState))
        .then(res => {
            dispatch({
                type: TEST_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : TEST_DELETE_FAIL,
                payload : err
            })
        })
        
}

//TEST DELETE
export const toggleTest = (id) => (dispatch, getState) =>{
    dispatch({type : TEST_LOADING});
    let paths = `${path}/test/${id}/set_delete` 
    axios.delete(paths, testSetConfig(getState))
        .then(res => {
            dispatch({
                type: TEST_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : TEST_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN TEST
export const editTest = id => (dispatch) => {
    dispatch(
        {
        type : TEST_EDIT,
        payload: id
    });    
};

export const activateTest = id => (dispatch) => {
    dispatch(
        {
        type : TEST_ACTIVATE_SUCCESS,
        payload: id
    });    
};

export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: TEST_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: TEST_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const testSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
