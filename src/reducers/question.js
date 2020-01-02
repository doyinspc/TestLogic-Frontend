import {
    QUESTION_GET_MULTIPLE,
    QUESTION_GET_ONE,
    QUESTION_REGISTER_SUCCESS,
    QUESTION_ADD_SUCCESS,
    QUESTION_REGISTER_FAIL,
    QUESTION_LOADING,
    QUESTION_LOADING_ERROR,
    QUESTION_ACTIVATE_FAIL,
    QUESTION_ACTIVATE_SUCCESS,
    QUESTION_UPDATE_SUCCESS,
    QUESTION_UPDATE_FAIL,
    QUESTION_DELETE_SUCCESS,
    QUESTION_DELETE_FAIL,
    QUESTION_EDIT,
    QUESTION_RESET,
    QUESTION_HIDE,
    QUESTION_FORM,
    QUESTION_ACTIVE,
    QUESTION_DATAS
} from "../types/question";

let inst = localStorage.getItem('questions') && typeof localStorage.getItem('questions') !== 'undefined' ? JSON.parse(localStorage.getItem('questions')): [];

const initialState = {
    isLoading: false,
    questions: inst,
    question: {},
    instruction: localStorage.getItem('instruction') || null ,
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newQUESTION = [...aluu];
    newQUESTION.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newQUESTION;
}

const changeQUESTION = (aluu, actid) =>
{
    let newQUESTION = [...aluu];
    newQUESTION.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newQUESTION;
}

export default function(state = initialState, action){
    switch (action.type) {
        case QUESTION_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case QUESTION_ACTIVE:
            return {
                ...state,
                question:action.payload
        };
        case QUESTION_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case QUESTION_EDIT:
            let ses = state.questions.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                question: ses,
                isForm: true
        };
        case QUESTION_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case QUESTION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case QUESTION_GET_MULTIPLE:
            localStorage.setItem('instruction', action.instruction);
            localStorage.setItem('questions', JSON.stringify(action.payload));
            return {
                ...state,
                questions : action.payload,
                instruction: action.instruction,
                msg:'DONE!!!'
            };
        case QUESTION_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case QUESTION_REGISTER_SUCCESS:
            let newQuestion = action.payload[0];
            return {
                ...state,
                questions: [ ...state.questions, newQuestion],
                question: newQuestion,
                isForm : false,
                msg:"Done !!!"
            }; 
         case QUESTION_RESET:
            return {
                ...state,
                QUESTIONState: 0,
                QUESTION:{}
            };
        case QUESTION_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                QUESTIONs: changeState(state.QUESTIONs, action.payload)
            }
        case QUESTION_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                questions: state.questions.filter(cat => cat.id != action.payload.id)
            }
        case QUESTION_UPDATE_SUCCESS:
            const findInd = state.questions.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.questions];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                questions : newState
            }; 
        case QUESTION_ADD_SUCCESS:
            const findInds = state.questions.findIndex(cat => cat.id == action.payload[0].id);
            let newStates = [...state.questions];
            newStates[findInds] = action.payload[0];
            return {
                ...state,
                ...action.payload,
                questions : newStates
            }; 
        case QUESTION_LOADING_ERROR:
        case QUESTION_ACTIVATE_FAIL:
        case QUESTION_REGISTER_FAIL:
        case QUESTION_DELETE_FAIL:
        case QUESTION_UPDATE_FAIL:
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