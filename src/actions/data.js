import axios from 'axios';
import {
    DATAS_GET,
    DATAS_GET_ONE,
    DATAS_GET_MULTIPLE,
    DATAS_GET_MULTIPLE_PERSONAL,
    DATAS_REGISTER_SUCCESS,
    DATAS_REGISTER_FAIL,
    DATAS_LOADING,
    DATAS_LOADING_ERROR,
    DATAS_ACTIVATE_FAIL,
    DATAS_ACTIVATE_SUCCESS,
    DATAS_UPDATE_SUCCESS,
    DATAS_UPDATE_FAIL,
    DATAS_DELETE_SUCCESS,
    DATAS_DELETE_FAIL,
    DATAS_PAYMENT_SUCCESS,
    DATAS_EDIT,
    DATAS_RESET,
    DATAS_FORM,
    API_PATH
} from "./types";

const path = API_PATH;

//GET ALL DATAS 
export const getDatas = () => (dispatch, getState) => {
        let paths = `${path}/datas` 
        console.log(paths)
        axios.get(paths, DatasSetConfig(getState))
            .then(res => {
                dispatch({
                    type: DATAS_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : DATAS_LOADING_ERROR,
                    payload:err
                })
            })
};
export const getDatasCat = (num) => (dispatch, getState) => {
    let paths = `${path}/datas/cat/${num}` 
    axios.get(paths, DatasSetConfig(getState))
        .then(res => {
            dispatch({
                type: DATAS_GET_MULTIPLE,
                payload: res.data,
                id:num
            })
        })
        .catch(err => {
            dispatch({
                type : DATAS_LOADING_ERROR,
                payload:err
            })
        })
};

export const getDatasCats = (num) => (getState) => {
    let paths = `${path}/datas/cat/${num}` 
    axios.get(paths, DatasSetConfig(getState))
        .then(res => {
            return res.data
        })
        .catch(err => {
            return {}
        })
};

export const toggleForm = (form) => (dispatch) => {
    dispatch({
                type: DATAS_FORM,
                payload: form
            })
};



//SET TOKEN AND HEADER - HELPER FUNCTION
export const DatasSetConfig = () => {
    // headers
    const config ={
        headers:{
            
        }
    }

  

    return config
}
