import axios from 'axios';
import { API_PATH } from './types';

import {
    TOPIC_GET,
    TOPIC_GET_ONE,
    TOPIC_GET_MULTIPLE,
    TOPIC_REGISTER_SUCCESS,
    TOPIC_REGISTER_FAIL,
    TOPIC_LOADING,
    TOPIC_LOADING_ERROR,
    TOPIC_ACTIVATE_FAIL,
    TOPIC_ACTIVATE_SUCCESS,
    TOPIC_UPDATE_SUCCESS,
    TOPIC_UPDATE_FAIL,
    TOPIC_DELETE_SUCCESS,
    TOPIC_DELETE_FAIL,
    TOPIC_EDIT,
    TOPIC_RESET,
    TOPIC_FORM,
    TOPIC_HIDE,
    TOPIC_DATAS
} from "../types/topic";

const path = API_PATH;

//GET ALL TOPIC 
export const getTopics = (id) => (dispatch, getState) => {
        let paths = `${path}/topic/mult/${id}` 
        axios.get(paths, topicSetConfig(getState))
            .then(res => {
                dispatch({
                    type: TOPIC_GET_MULTIPLE,
                    payload: res.data,
                    theme: id
                })
            })
            .catch(err => {
                dispatch({
                    type : TOPIC_LOADING_ERROR,
                    payload: err
                })
            })
};
export const getTopic = (num) => (dispatch, getState) => {
        let paths = `${path}/topic/${num}` ;
        axios.get(paths, topicSetConfig(getState))
        .then(res => {
            dispatch({
                type: TOPIC_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : TOPIC_LOADING_ERROR,
                payload: err
            })
        })
};

//TOPIC REGISTER
export const registerTopic = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/topic/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            let newdata = data;
            newdata['id'] = res.insertId;
            dispatch({
                type: TOPIC_REGISTER_SUCCESS,
                payload: newdata
            })
        })
        .catch(err => {
            dispatch({
                type : TOPIC_LOADING_ERROR,
                payload: err
            })
        })
};
//TOPIC EDIT/DELETE
export const updateTopic = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/topic/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: TOPIC_UPDATE_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type : TOPIC_UPDATE_FAIL,
                payload: err
            })
        })
};

//TOPIC DELETE
export const deleteTopic = (id) => (dispatch, getState) =>{
    dispatch({type : TOPIC_LOADING});
    let paths = `${path}/topic/${id}/set_delete` 
    axios.delete(paths, topicSetConfig(getState))
        .then(res => {
            dispatch({
                type: TOPIC_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : TOPIC_DELETE_FAIL,
                payload : err
            })
        })
        
}

//TOPIC DELETE
export const toggleTopic = (id) => (dispatch, getState) =>{
    dispatch({type : TOPIC_LOADING});
    let paths = `${path}/topic/${id}/set_delete` 
    axios.delete(paths, topicSetConfig(getState))
        .then(res => {
            dispatch({
                type: TOPIC_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : TOPIC_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN TOPIC
export const editTopic = id => (dispatch) => {
    dispatch(
        {
        type : TOPIC_EDIT,
        payload: id
    });    
};


export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: TOPIC_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: TOPIC_HIDE
            })
};

export const activateTopic = id => (dispatch) => {
    dispatch(
        {
        type : TOPIC_ACTIVATE_SUCCESS,
        payload: id
    });    
};

//SET TOKEN AND HEADER - HELPER FUNCTION
export const topicSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
