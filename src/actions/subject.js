import axios from 'axios';
import { API_PATH } from './types';

import {
    SUBJECT_GET,
    SUBJECT_GET_ONE,
    SUBJECT_GET_MULTIPLE,
    SUBJECT_REGISTER_SUCCESS,
    SUBJECT_REGISTER_FAIL,
    SUBJECT_LOADING,
    SUBJECT_LOADING_ERROR,
    SUBJECT_ACTIVATE_FAIL,
    SUBJECT_ACTIVATE_SUCCESS,
    SUBJECT_UPDATE_SUCCESS,
    SUBJECT_UPDATE_FAIL,
    SUBJECT_DELETE_SUCCESS,
    SUBJECT_DELETE_FAIL,
    SUBJECT_EDIT,
    SUBJECT_RESET,
    SUBJECT_FORM,
    SUBJECT_HIDE
} from "../types/subject";

const path = API_PATH;

//GET ALL SUBJECT 
export const getSubjects = () => (dispatch, getState) => {
        let paths = `${path}/subject/`
        axios.get(paths, subjectSetConfig(getState))
            .then(res => {
                dispatch({
                    type: SUBJECT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : SUBJECT_LOADING_ERROR,
                    payload: err
                })
            })
};
export const getSubject = (num) => (dispatch, getState) => {
        let paths = `${path}/subject/${num}` ;
        axios.get(paths, subjectSetConfig(getState))
        .then(res => {
            dispatch({
                type: SUBJECT_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : SUBJECT_LOADING_ERROR,
                payload: err
            })
        })
};

//SUBJECT REGISTER
export const registerSubject = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/subject/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            let newdata = data;
            newdata['id'] = res.insertId;
            dispatch({
                type: SUBJECT_REGISTER_SUCCESS,
                payload: newdata
            })
        })
        .catch(err => {
            dispatch({
                type : SUBJECT_LOADING_ERROR,
                payload: err
            })
        })
};
//SUBJECT EDIT/DELETE
export const updateSubject = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/subject/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: SUBJECT_UPDATE_SUCCESS,
                payload: data,
                id:id
            })
        })
        .catch(err => {
            dispatch({
                type : SUBJECT_UPDATE_FAIL,
                payload: err
            })
        })
};

//SUBJECT DELETE
export const deleteSubject = (id) => (dispatch, getState) =>{
    dispatch({type : SUBJECT_LOADING});
    let paths = `${path}/subject/${id}/set_delete` 
    axios.delete(paths, subjectSetConfig(getState))
        .then(res => {
            dispatch({
                type: SUBJECT_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : SUBJECT_DELETE_FAIL,
                payload : err
            })
        })
        
}

//SUBJECT DELETE
export const toggleSubject = (id, active) => (dispatch, getState) =>{
    dispatch({type : SUBJECT_LOADING});
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/subject/${id}` ;
    axios.get(paths, subjectSetConfig(getState))
    .then(res => {
            let act = res.data[0].active == 1? 0 : 1;
            let body =  JSON.stringify({'active': act});
            let pathss = `${path}/subject/activate/${id}`;
            axios.patch(pathss, body, config)
                .then(ress => {
                    dispatch({
                        type: SUBJECT_UPDATE_SUCCESS,
                        payload: ress.data[0],
                        id:id
                    })
                })
                .catch(err => {
                    dispatch({
                        type : SUBJECT_DELETE_FAIL,
                        payload : err
                    })
                })
    })
    .catch(err => {
        dispatch({
            type : SUBJECT_LOADING_ERROR,
            payload: err
        })
    })
        
}

//ACTIVATE OR DEACTIVATE AN SUBJECT
export const editSubject = id => (dispatch) => {
    dispatch({
        type : SUBJECT_EDIT,
        payload: id
    });    
};


export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: SUBJECT_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: SUBJECT_HIDE
            })
};


//SET TOKEN AND HEADER - HELPER FUNCTION
export const subjectSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
