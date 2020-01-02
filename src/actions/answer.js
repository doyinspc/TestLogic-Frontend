import axios from 'axios';
import { API_PATH } from './types';

import {
    ANSWER_GET,
    ANSWER_GET_ONE,
    ANSWER_GET_MULTIPLE,
    ANSWER_REGISTER_SUCCESS,
    ANSWER_REGISTER_FAIL,
    ANSWER_LOADING,
    ANSWER_LOADING_ERROR,
    ANSWER_ACTIVATE_FAIL,
    ANSWER_ACTIVATE_SUCCESS,
    ANSWER_UPDATE_SUCCESS,
    ANSWER_UPDATE_FAIL,
    ANSWER_DELETE_SUCCESS,
    ANSWER_DELETE_FAIL,
    ANSWER_EDIT,
    ANSWER_RESET,
    ANSWER_FORM,
    ANSWER_HIDE
} from "../types/answer";

import { QUESTION_ADD_SUCCESS, QUESTION_LOADING_ERROR } from "../types/question";



const path = API_PATH;

//GET ALL ANSWER 
export const getAnswers = (id) => (dispatch, getState) => {
        let paths = `${path}/answer/ass/${id}` 
        console.log(paths)
        axios.get(paths, answerSetConfig(getState))
            .then(res => {
                dispatch({
                    type: ANSWER_GET_MULTIPLE,
                    payload: res.data,
                    ca: id
                })
            })
            .catch(err => {
                dispatch({
                    type : ANSWER_LOADING_ERROR,
                    payload: err
                })
            })
};
export const getAnswer = (num) => (dispatch, getState) => {
        let paths = `${path}/answer/${num}` ;
        axios.get(paths, answerSetConfig(getState))
        .then(res => {
            dispatch({
                type: ANSWER_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : ANSWER_LOADING_ERROR,
                payload: err
            })
        })
};




//ANSWER REGISTER
export const registerAnswer = (data) => (dispatch, getState) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/answer/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            let pathz = `${path}/question/${data.questionID}` ;
            axios.get(pathz, answerSetConfig(getState))
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
                type : ANSWER_LOADING_ERROR,
                payload: err
            })
        })
};

//ANSWER EDIT/DELETE
export const updateAnswer = (data, id, qid) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/answer/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            let pathz = `${path}/question/${qid}` ;
            axios.get(pathz, answerSetConfig(getState))
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
                type : ANSWER_UPDATE_FAIL,
                payload: err
            })
        })
};

//ANSWER DELETE
export const deleteAnswer = (id, qid) => (dispatch, getState) =>{
    dispatch({type : ANSWER_LOADING});
    let paths = `${path}/answer/${id}` 
    axios.delete(paths, answerSetConfig(getState))
        .then(res => {
            let pathz = `${path}/question/${qid}` ;
            axios.get(pathz, answerSetConfig(getState))
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
                type : ANSWER_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ANSWER DELETE
export const toggleAnswer = (id) => (dispatch, getState) =>{
    dispatch({type : ANSWER_LOADING});
    let paths = `${path}/answer/${id}/set_delete` 
    axios.delete(paths, answerSetConfig(getState))
        .then(res => {
            dispatch({
                type: ANSWER_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : ANSWER_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN ANSWER
export const editAnswer = id => (dispatch) => {
    dispatch(
        {
        type : ANSWER_EDIT,
        payload: id
    });    
};


export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: ANSWER_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: ANSWER_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const answerSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }
    return config
}

