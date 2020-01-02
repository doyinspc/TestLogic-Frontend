import axios from 'axios';
import { API_PATH } from './types';

import {
    DISTRACTOR_GET,
    DISTRACTOR_GET_ONE,
    DISTRACTOR_GET_MULTIPLE,
    DISTRACTOR_REGISTER_SUCCESS,
    DISTRACTOR_REGISTER_FAIL,
    DISTRACTOR_LOADING,
    DISTRACTOR_LOADING_ERROR,
    DISTRACTOR_ACTIVATE_FAIL,
    DISTRACTOR_ACTIVATE_SUCCESS,
    DISTRACTOR_UPDATE_SUCCESS,
    DISTRACTOR_UPDATE_FAIL,
    DISTRACTOR_DELETE_SUCCESS,
    DISTRACTOR_DELETE_FAIL,
    DISTRACTOR_EDIT,
    DISTRACTOR_RESET,
    DISTRACTOR_FORM,
    DISTRACTOR_HIDE,
    DISTRACTOR_DATAS
} from "../types/distractor";
import { QUESTION_ADD_SUCCESS, QUESTION_LOADING_ERROR } from "../types/question";
const path = API_PATH;

export const getDatas = () => (dispatch, getState) => {
    let paths = `${path}/datas` 
    axios.get(paths, distractorSetConfig(getState))
        .then(res => {
            dispatch({
                type: DISTRACTOR_DATAS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : DISTRACTOR_LOADING_ERROR,
                payload: err
            })
        })
};

//GET ALL DISTRACTOR 
export const getDistractors = (id) => (dispatch, getState) => {
        let paths = `${path}/distractor/ass/${id}` 
        console.log(paths)
        axios.get(paths, distractorSetConfig(getState))
            .then(res => {
                dispatch({
                    type: DISTRACTOR_GET_MULTIPLE,
                    payload: res.data,
                    ca: id
                })
            })
            .catch(err => {
                dispatch({
                    type : DISTRACTOR_LOADING_ERROR,
                    payload: err
                })
            })
};
export const getDistractor = (num) => (dispatch, getState) => {
        let paths = `${path}/distractor/${num}` ;
        axios.get(paths, distractorSetConfig(getState))
        .then(res => {
            dispatch({
                type: DISTRACTOR_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : DISTRACTOR_LOADING_ERROR,
                payload: err
            })
        })
};

//DISTRACTOR REGISTER
export const registerDistractor = (data) => (dispatch, getState) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    let paths = `${path}/distractor/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            let pathz = `${path}/question/${data.questionID}` ;
            axios.get(pathz, distractorSetConfig(getState))
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
                type : DISTRACTOR_LOADING_ERROR,
                payload: err
            })
        })
};

//DISTRACTOR EDIT
export const updateDistractor = (data, id, qid) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/distractor/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            let pathz = `${path}/question/${qid}` ;
            axios.get(pathz, distractorSetConfig(getState))
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
                type : DISTRACTOR_UPDATE_FAIL,
                payload: err
            })
        })
};

//DISTRACTOR DELETE
export const deleteDistractor = (id, qid) => (dispatch, getState) =>{
    dispatch({type : DISTRACTOR_LOADING});
    let paths = `${path}/distractor/${id}` 
    axios.delete(paths, distractorSetConfig(getState))
        .then(res => {
            let pathz = `${path}/question/${qid}` ;
            axios.get(pathz, distractorSetConfig(getState))
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
                type : DISTRACTOR_DELETE_FAIL,
                payload : err
            })
        })
        
}

//DISTRACTOR DELETE
export const toggleDistractor = (id) => (dispatch, getState) =>{
    dispatch({type : DISTRACTOR_LOADING});
    let paths = `${path}/distractor/${id}/set_delete` 
    axios.delete(paths, distractorSetConfig(getState))
        .then(res => {
            dispatch({
                type: DISTRACTOR_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : DISTRACTOR_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN DISTRACTOR
export const editDistractor = id => (dispatch) => {
    dispatch(
        {
        type : DISTRACTOR_EDIT,
        payload: id
    });    
};


export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: DISTRACTOR_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: DISTRACTOR_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const distractorSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
