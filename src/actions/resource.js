import axios from 'axios';
import { API_PATH } from './types';

import {
    RESOURCE_GET,
    RESOURCE_GET_ONE,
    RESOURCE_GET_MULTIPLE,
    RESOURCE_GET_MULTIPLE_SEC,
    RESOURCE_REGISTER_SUCCESS,
    RESOURCE_REGISTER_FAIL,
    RESOURCE_LOADING,
    RESOURCE_LOADING_ERROR,
    RESOURCE_ACTIVATE_FAIL,
    RESOURCE_ACTIVATE_SUCCESS,
    RESOURCE_UPDATE_SUCCESS,
    RESOURCE_UPDATE_FAIL,
    RESOURCE_DELETE_SUCCESS,
    RESOURCE_DELETE_FAIL,
    RESOURCE_EDIT,
    RESOURCE_RESET,
    RESOURCE_FORM,
    RESOURCE_HIDE,
    RESOURCE_DATAS
} from "../types/resource";

const path = API_PATH;

//GET ALL RESOURCE 
export const getResources = (id) => (dispatch, getState) => {
        let paths = `${path}/resource/cat/${id}` 
        console.log(paths)
        axios.get(paths, resourceSetConfig(getState))
            .then(res => {
                dispatch({
                    type: RESOURCE_GET_MULTIPLE,
                    payload: res.data,
                    resource: id
                })
            })
            .catch(err => {
                dispatch({
                    type : RESOURCE_LOADING_ERROR,
                    payload: err
                })
            })
};
//GET ALL RESOURCE 
export const getResourcesList = (id) => (dispatch, getState) => {
    let paths = `${path}/resource/cat/${id}` 
    axios.get(paths, resourceSetConfig(getState))
        .then(res => {
            dispatch({
                type: RESOURCE_GET_MULTIPLE_SEC,
                payload: res.data,
                resource: id
            })
        })
        .catch(err => {
            dispatch({
                type : RESOURCE_LOADING_ERROR,
                payload: err
            })
        })
};
export const getResource = (num) => (dispatch, getState) => {
        let paths = `${path}/resource/${num}` ;
        axios.get(paths, resourceSetConfig(getState))
        .then(res => {
            dispatch({
                type: RESOURCE_GET_ONE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : RESOURCE_LOADING_ERROR,
                payload: err
            })
        })
};

//RESOURCE REGISTER
export const registerResource = (data) => (dispatch) => {

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
   
    let paths = `${path}/resource/register` 
    axios.post(paths, JSON.stringify(data), config)
        .then(res => {
            let newdata = data;
            newdata['id'] = res.insertId;
            dispatch({
                type: RESOURCE_REGISTER_SUCCESS,
                payload: newdata
            })
        })
        .catch(err => {
            dispatch({
                type : RESOURCE_LOADING_ERROR,
                payload: err
            })
        })
};
//RESOURCE EDIT/DELETE
export const updateResource = (data, id) => (dispatch, getState) => {
    //body
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/resource/update/${id}` 
    let body =  JSON.stringify(data)
    data['id'] = id;
    axios.patch(paths, body, config)
        .then(res => {
            dispatch({
                type: RESOURCE_UPDATE_SUCCESS,
                payload: data,
                id:id
            })
        })
        .catch(err => {
            dispatch({
                type : RESOURCE_UPDATE_FAIL,
                payload: err
            })
        })
};

//RESOURCE DELETE
export const deleteResource = (id) => (dispatch, getState) =>{
    dispatch({type : RESOURCE_LOADING});
    let paths = `${path}/resource/${id}/set_delete` 
    axios.delete(paths, resourceSetConfig(getState))
        .then(res => {
            dispatch({
                type: RESOURCE_DELETE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : RESOURCE_DELETE_FAIL,
                payload : err
            })
        })
        
}

//RESOURCE DELETE
export const toggleResource = (id, active) => (dispatch, getState) =>{
    dispatch({type : RESOURCE_LOADING});
    const config ={
        headers:{
             'Content-Type':'application/json'
        }
    }
    
    let paths = `${path}/resource/${id}`;
    axios.get(paths, resourceSetConfig(getState))
    .then(res => {
            let act = res.data[0].active == 1? 0 : 1;
            let body =  JSON.stringify({'active': act});
            let pathss = `${path}/resource/update/${id}`;
            axios.patch(pathss, body, config)
                .then(ress => {
                    dispatch({
                        type: RESOURCE_UPDATE_SUCCESS,
                        payload: ress.data[0],
                        id:id
                    })
                })
                .catch(err => {
                    dispatch({
                        type : RESOURCE_DELETE_FAIL,
                        payload : err
                    })
                })
    })
    .catch(err => {
        dispatch({
            type : RESOURCE_LOADING_ERROR,
            payload: err
        })
    })
        
}


//ACTIVATE OR DEACTIVATE AN RESOURCE
export const editResource = id => (dispatch) => {
    dispatch(
        {
        type : RESOURCE_EDIT,
        payload: id
    });    
};


export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: RESOURCE_FORM,
                payload: form
            })
};

export const hideActions = () => (dispatch) => {
    dispatch({
                type: RESOURCE_HIDE
            })
};

export const activateResource = id => (dispatch) => {
    dispatch(
        {
        type : RESOURCE_ACTIVATE_SUCCESS,
        payload: id
    });    
};

//SET TOKEN AND HEADER - HELPER FUNCTION
export const resourceSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
