import axios from 'axios';
import { API_PATH } from './types';

import {
    QUESTION_GET,
    QUESTION_GET_ONE,
    QUESTION_GET_MULTIPLE,
    QUESTION_REGISTER_SUCCESS,
    QUESTION_REGISTER_FAIL,
    QUESTION_LOADING,
    QUESTION_LOADING_ERROR,
    QUESTION_ACTIVATE_FAIL,
    QUESTION_ACTIVATE_SUCCESS,
    QUESTION_UPDATE_SUCCESS,
    QUESTION_UPDATE_FAIL,
    QUESTION_DELETE_SUCCESS,
    QUESTION_DELETE_FAIL,
    QUESTION_ADD_SUCCESS,
    QUESTION_EDIT,
    QUESTION_RESET,
    QUESTION_FORM,
    QUESTION_HIDE
} from "../types/question";

const path = API_PATH;

//GET ALL QUESTION 
export const getQuestions = (id) => (dispatch, getState) => {
        let paths = `${path}/question/cat/${id}` 
        axios.get(paths, questionSetConfig(getState))
            .then(res => {
                dispatch({
                    type: QUESTION_GET_MULTIPLE,
                    payload: res.data,
                    instruction: id
                })
            })
            .catch(err => {
                dispatch({
                    type : QUESTION_LOADING_ERROR,
                    payload: err
                })
            })
};
export const getQuestion = (num) => (dispatch, getState) => {
        let paths = `${path}/question/${num}` ;
        axios.get(paths, questionSetConfig(getState))
        .then(res => {
            dispatch({
                type: QUESTION_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : QUESTION_LOADING_ERROR,
                payload: err
            })
        })
};

//QUESTION REGISTER
export const registerQuestion = (data) => (dispatch, getState) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    let paths = `${path}/question/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            console.log(res);
            let pathz = `${path}/question/${res.data.insertId}` ;
            axios.get(pathz, questionSetConfig(getState))
            .then(reso => {
                dispatch({
                    type: QUESTION_REGISTER_SUCCESS,
                    payload: reso.data
                })
            })
            .catch(err => {
                dispatch({
                    type : QUESTION_LOADING_ERROR,
                    payload: err
                })
            })
        })
        .catch(err => {
            dispatch({
                type : QUESTION_LOADING_ERROR,
                payload: err
            })
        })
};
//QUESTION EDIT/DELETE
export const updateQuestion = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/question/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            let pathz = `${path}/question/${id}` ;
            axios.get(pathz, questionSetConfig(getState))
            .then(reso => {
                dispatch({
                    type: QUESTION_ADD_SUCCESS,
                    payload: reso.data
                })
            })
            .catch(err => {
                dispatch({
                    type : QUESTION_LOADING_ERROR,
                    payload: err
                })
            })
        })
        .catch(err => {
            dispatch({
                type : QUESTION_UPDATE_FAIL,
                payload: err
            })
        })
};

export const moveQuestion = (data) => (dispatch, getState) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    let paths = `${path}/question/move` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
                dispatch({
                    type: QUESTION_GET_MULTIPLE,
                    payload: res.data,
                    instruction: data.currentInstruction
                })
        })
        .catch(err => {
            dispatch({
                type : QUESTION_LOADING_ERROR,
                payload: err
            })
        })
};

//QUESTION DELETE
export const deleteQuestion = (id) => (dispatch, getState) =>{
    dispatch({type : QUESTION_LOADING});
    let paths = `${path}/question/${id}/set_delete` 
    axios.delete(paths, questionSetConfig(getState))
        .then(res => {
            dispatch({
                type: QUESTION_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : QUESTION_DELETE_FAIL,
                payload : err
            })
        })
        
}

//QUESTION DELETE
export const toggleQuestion = (id) => (dispatch, getState) =>{
    dispatch({type : QUESTION_LOADING});
    let paths = `${path}/question/${id}/set_delete` 
    axios.delete(paths, questionSetConfig(getState))
        .then(res => {
            dispatch({
                type: QUESTION_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : QUESTION_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN QUESTION
export const editQuestion = id => (dispatch) => {
    dispatch(
        {
        type : QUESTION_EDIT,
        payload: id
    });    
};

export const activateQuestion = id => (dispatch) => {
    dispatch(
        {
        type : QUESTION_ACTIVATE_SUCCESS,
        payload: id
    });    
};

export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: QUESTION_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: QUESTION_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const questionSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
