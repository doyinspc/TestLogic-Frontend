import {
    SCORE_GET_MULTIPLE,
    SCORE_GET_MULTIPLE_SEC,
    SCORE_GET_ONE,
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
    SCORE_HIDE,
    SCORE_FORM,
    SCORE_ACTIVE,
    SCORE_DATAS
} from "../types/score";

let inst = localStorage.getItem('scores') && typeof localStorage.getItem('scores') !== 'undefined' ? JSON.parse(localStorage.getItem('scores')): [];

const initialState = {
    isLoading: false,
    scores: inst,
    score: {},
    topic: localStorage.getItem('topic') || null ,
    scoresList: [],
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newSCORE = [...aluu];
    newSCORE.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newSCORE;
}

const changeSCORE = (aluu, actid) =>
{
    let newSCORE = [...aluu];
    newSCORE.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newSCORE;
}

export default function(state = initialState, action){
    switch (action.type) {
        case SCORE_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case SCORE_ACTIVE:
            return {
                ...state,
                score:action.payload
        };
        case SCORE_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case SCORE_EDIT:
            let ses = state.scores.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                score: ses,
                isForm: true
        };
        case SCORE_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case SCORE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case SCORE_GET_MULTIPLE:
            localStorage.setItem('topic', action.topic);
            localStorage.setItem('scores', JSON.stringify(action.payload));
            return {
                ...state,
                scores : action.payload,
                topic: action.topic,
                msg:'DONE!!!'
            };
         case SCORE_GET_MULTIPLE_SEC:
            return {
                ...state,
                scoresList : action.payload
            };
        case SCORE_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case SCORE_REGISTER_SUCCESS:
            let newScore = action.payload;
            newScore['id'] = action.id;
            return {
                ...state,
                scores: [ ...state.scores, newScore],
                score: newScore,
                isForm : false,
                msg:"Done !!!"
            }; 
         case SCORE_RESET:
            return {
                ...state,
                SCOREState: 0,
                SCORE:{}
            };
        case SCORE_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                SCOREs: changeState(state.SCOREs, action.payload)
            }
        case SCORE_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                scores: state.scores.filter(cat => cat.id != action.payload.id)
            }
        case SCORE_UPDATE_SUCCESS:
            const findInd = state.scores.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.scores];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                scores : newState
            }; 
        case SCORE_LOADING_ERROR:
        case SCORE_ACTIVATE_FAIL:
        case SCORE_REGISTER_FAIL:
        case SCORE_DELETE_FAIL:
        case SCORE_UPDATE_FAIL:
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