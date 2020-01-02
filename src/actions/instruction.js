import axios from 'axios';
import { API_PATH } from './types';

import {
    INSTRUCTION_GET,
    INSTRUCTION_GET_ONE,
    INSTRUCTION_GET_MULTIPLE,
    INSTRUCTION_REGISTER_SUCCESS,
    INSTRUCTION_REGISTER_FAIL,
    INSTRUCTION_LOADING,
    INSTRUCTION_LOADING_ERROR,
    INSTRUCTION_ACTIVATE_FAIL,
    INSTRUCTION_ACTIVATE_SUCCESS,
    INSTRUCTION_UPDATE_SUCCESS,
    INSTRUCTION_UPDATE_FAIL,
    INSTRUCTION_DELETE_SUCCESS,
    INSTRUCTION_DELETE_FAIL,
    INSTRUCTION_EDIT,
    INSTRUCTION_RESET,
    INSTRUCTION_FORM,
    INSTRUCTION_HIDE,
    INSTRUCTION_DATAS
} from "../types/instruction";

const path = API_PATH;

//GET ALL INSTRUCTION 
export const getInstructions = (id) => (dispatch, getState) => {
        let paths = `${path}/instruction/cat/${id}` 
        axios.get(paths, instructionSetConfig(getState))
            .then(res => {
                dispatch({
                    type: INSTRUCTION_GET_MULTIPLE,
                    payload: res.data,
                    topic: id
                })
            })
            .catch(err => {
                dispatch({
                    type : INSTRUCTION_LOADING_ERROR,
                    payload: err
                })
            })
};
export const getInstruction = (num) => (dispatch, getState) => {
        let paths = `${path}/instruction/${num}` ;
        axios.get(paths, instructionSetConfig(getState))
        .then(res => {
            dispatch({
                type: INSTRUCTION_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : INSTRUCTION_LOADING_ERROR,
                payload: err
            })
        })
};

//INSTRUCTION REGISTER
export const registerInstruction = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/instruction/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            dispatch({
                type: INSTRUCTION_GET_MULTIPLE,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : INSTRUCTION_LOADING_ERROR,
                payload: err
            })
        })
};
//INSTRUCTION EDIT/DELETE
export const updateInstruction = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/instruction/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: INSTRUCTION_UPDATE_SUCCESS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type : INSTRUCTION_UPDATE_FAIL,
                payload: err
            })
        })
};

//INSTRUCTION DELETE
export const deleteInstruction = (id) => (dispatch, getState) =>{
    dispatch({type : INSTRUCTION_LOADING});
    let paths = `${path}/instruction/${id}/set_delete` 
    axios.delete(paths, instructionSetConfig(getState))
        .then(res => {
            dispatch({
                type: INSTRUCTION_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : INSTRUCTION_DELETE_FAIL,
                payload : err
            })
        })
        
}

//INSTRUCTION DELETE
export const toggleInstruction = (id) => (dispatch, getState) =>{
    dispatch({type : INSTRUCTION_LOADING});
    let paths = `${path}/instruction/${id}/set_delete` 
    axios.delete(paths, instructionSetConfig(getState))
        .then(res => {
            dispatch({
                type: INSTRUCTION_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : INSTRUCTION_DELETE_FAIL,
                payload : err
            })
        })
        
}

//ACTIVATE OR DEACTIVATE AN INSTRUCTION
export const editInstruction = id => (dispatch) => {
    dispatch(
        {
        type : INSTRUCTION_EDIT,
        payload: id
    });    
};

export const activateInstruction = id => (dispatch) => {
    dispatch(
        {
        type : INSTRUCTION_ACTIVATE_SUCCESS,
        payload: id
    });    
};

export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: INSTRUCTION_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: INSTRUCTION_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const instructionSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
