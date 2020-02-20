import axios from 'axios';
import { API_PATH } from './types';

import {
    SCORE_GET,
    SCORE_GET_ONE,
    SCORE_GET_MULTIPLE,
    SCORE_GET_MULTIPLE_SEC,
    SCORE_REGISTER_SUCCESS,
    SCORE_REGISTER_FAIL,
    SCORE_LOADING,
    SCORE_LOADING_ERROR,
    SCORE_ACTIVATE_FAIL,
    SCORE_ACTIVATE_SUCCESS,
    SCORE_UPDATE_SUCCESS,
    SCORE_UPDATE_FAIL,
    SCORE_DELETE_SUCCESS,
    SCORE_DELETE_FAIL,
    SCORE_EDIT,
    SCORE_RESET,
    SCORE_FORM,
    SCORE_HIDE,
    SCORE_DATAS
} from "../types/score";

const path = API_PATH;

//GET ALL SCORE 
export const getScores = (id) => (dispatch, getState) => {
        let paths = `${path}/score/cat/${id}` 
        axios.get(paths, scoreSetConfig(getState))
            .then(res => {
                dispatch({
                    type: SCORE_GET_MULTIPLE,
                    payload: res.data,
                    topic: id
                })
            })
            .catch(err => {
                dispatch({
                    type : SCORE_LOADING_ERROR,
                    payload: err
                })
            })
};
//GET ALL SCORE 
export const getScoresList = (id) => (dispatch, getState) => {
    let paths = `${path}/score/cat/${id}` 
    axios.get(paths, scoreSetConfig(getState))
        .then(res => {
            dispatch({
                type: SCORE_GET_MULTIPLE_SEC,
                payload: res.data,
                topic: id
            })
        })
        .catch(err => {
            dispatch({
                type : SCORE_LOADING_ERROR,
                payload: err
            })
        })
};
export const getScore = (num) => (dispatch, getState) => {
        let paths = `${path}/score/${num}` ;
        axios.get(paths, scoreSetConfig(getState))
        .then(res => {
            dispatch({
                type: SCORE_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : SCORE_LOADING_ERROR,
                payload: err
            })
        })
};

//SCORE REGISTER
export const registerScore = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/score/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            dispatch({
                type: SCORE_GET_MULTIPLE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SCORE_LOADING_ERROR,
                payload: err
            })
        })
};
//SCORE EDIT
export const updateScore = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/score/update/${id}` 
    let body =  JSON.stringify(data);
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: SCORE_UPDATE_SUCCESS,
                payload: res.data[0]
            })
        })
        .catch(err => {
            dispatch({
                type : SCORE_UPDATE_FAIL,
                payload: err
            })
        })
};

//SCORE EDIT/DELETE
export const groupScore = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/score/group/${id}` 
    let body =  JSON.stringify({grp:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : SCORE_UPDATE_FAIL,
                payload: err
            })
        })
};

// MOVE SCORE 
export const moveScore = (id, groupNumber) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    let paths = `${path}/score/move/${id}` 
    let body =  JSON.stringify({scoreID:groupNumber});
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                msg: 'done'
            })
        })
        .catch(err => {
            dispatch({
                type : SCORE_UPDATE_FAIL,
                payload: err
            })
        })
};


//SCORE DELETE
export const deleteScore = (id) => (dispatch, getState) =>{
    dispatch({type : SCORE_LOADING});
    let paths = `${path}/score/${id}/set_delete` 
    axios.delete(paths, scoreSetConfig(getState))
        .then(res => {
            dispatch({
                type: SCORE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SCORE_DELETE_FAIL,
                payload : err
            })
        })
        
}

//SCORE DELETE
export const toggleScore = (id) => (dispatch, getState) =>{
    dispatch({type : SCORE_LOADING});
    let paths = `${path}/score/${id}/set_delete` 
    axios.delete(paths, scoreSetConfig(getState))
        .then(res => {
            dispatch({
                type: SCORE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SCORE_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN SCORE
export const editScore = id => (dispatch) => {
    dispatch(
        {
        type : SCORE_EDIT,
        payload: id
    });    
};

export const activateScore = id => (dispatch) => {
    dispatch(
        {
        type : SCORE_ACTIVATE_SUCCESS,
        payload: id
    });    
};

export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: SCORE_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: SCORE_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const scoreSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
