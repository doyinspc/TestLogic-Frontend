import {
    MOCKSCORE_GET_MULTIPLE,
    MOCKSCORE_GET_MULTIPLE_SEC,
    MOCKSCORE_GET_ONE,
    MOCKSCORE_REGISTER_SUCCESS,
    MOCKSCORE_REGISTER_FAIL,
    MOCKSCORE_LOADING,
    MOCKSCORE_LOADING_ERROR,
    MOCKSCORE_ACTIVATE_FAIL,
    MOCKSCORE_ACTIVATE_SUCCESS,
    MOCKSCORE_UPDATE_SUCCESS,
    MOCKSCORE_UPDATE_FAIL,
    MOCKSCORE_DELETE_SUCCESS,
    MOCKSCORE_DELETE_FAIL,
    MOCKSCORE_EDIT,
    MOCKSCORE_RESET,
    MOCKSCORE_HIDE,
    MOCKSCORE_FORM,
    MOCKSCORE_ACTIVE,
    MOCKSCORE_DATAS
} from "../types/mockscore";

let inst = localStorage.getItem('mockscores') && typeof localStorage.getItem('mockscores') !== 'undefined' ? JSON.parse(localStorage.getItem('mockscores')): [];

const initialState = {
    isLoading: false,
    mockscores: inst,
    mockscore: {},
    topic: localStorage.getItem('topic') || null ,
    mockscoresList: [],
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newMOCKSCORE = [...aluu];
    newMOCKSCORE.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newMOCKSCORE;
}

const changeMOCKSCORE = (aluu, actid) =>
{
    let newMOCKSCORE = [...aluu];
    newMOCKSCORE.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newMOCKSCORE;
}

export default function(state = initialState, action){
    switch (action.type) {
        case MOCKSCORE_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case MOCKSCORE_ACTIVE:
            return {
                ...state,
                mockscore:action.payload
        };
        case MOCKSCORE_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case MOCKSCORE_EDIT:
            let ses = state.mockscores.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                mockscore: ses,
                isForm: true
        };
        case MOCKSCORE_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case MOCKSCORE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case MOCKSCORE_GET_MULTIPLE:
            localStorage.setItem('topic', action.topic);
            localStorage.setItem('mockscores', JSON.stringify(action.payload));
            return {
                ...state,
                mockscores : action.payload,
                topic: action.topic,
                msg:'DONE!!!'
            };
         case MOCKSCORE_GET_MULTIPLE_SEC:
            return {
                ...state,
                mockscoresList : action.payload
            };
        case MOCKSCORE_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case MOCKSCORE_REGISTER_SUCCESS:
            let newMockscore = action.payload;
            newMockscore['id'] = action.id;
            return {
                ...state,
                mockscores: [ ...state.mockscores, newMockscore],
                mockscore: newMockscore,
                isForm : false,
                msg:"Done !!!"
            }; 
         case MOCKSCORE_RESET:
            return {
                ...state,
                MOCKSCOREState: 0,
                MOCKSCORE:{}
            };
        case MOCKSCORE_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                MOCKSCOREs: changeState(state.MOCKSCOREs, action.payload)
            }
        case MOCKSCORE_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                mockscores: state.mockscores.filter(cat => cat.id != action.payload.id)
            }
        case MOCKSCORE_UPDATE_SUCCESS:
            const findInd = state.mockscores.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.mockscores];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                mockscores : newState
            }; 
        case MOCKSCORE_LOADING_ERROR:
        case MOCKSCORE_ACTIVATE_FAIL:
        case MOCKSCORE_REGISTER_FAIL:
        case MOCKSCORE_DELETE_FAIL:
        case MOCKSCORE_UPDATE_FAIL:
            alert(action.payload)
            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}