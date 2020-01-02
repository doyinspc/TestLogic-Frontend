import {
    ANSWER_GET_MULTIPLE,
    ANSWER_GET_ONE,
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
    ANSWER_HIDE,
    ANSWER_FORM,
    ANSWER_ACTIVE
} from "../types/answer";


const initialState = {
    isLoading: false,
    answers: {},
    answer: {},
    ca:null,
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newANSWER = [...aluu];
    newANSWER.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newANSWER;
}

const changeANSWER = (aluu, actid) =>
{
    let newANSWER = [...aluu];
    newANSWER.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newANSWER;
}

export default function(state = initialState, action){
    switch (action.type) {

        case ANSWER_ACTIVE:
            return {
                ...state,
                ca:action.payload
        };
        case ANSWER_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case ANSWER_EDIT:
            let ses = state.answers.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                answer: ses,
                isForm: true
        };
        case ANSWER_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case ANSWER_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ANSWER_GET_MULTIPLE:
            return {
                ...state,
                answers : action.payload,
                ca: action.ca,
                msg:'DONE!!!'
            };
        case ANSWER_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case ANSWER_REGISTER_SUCCESS:
            let newAnswer = action.payload;
            newAnswer['id'] = action.id;
            return {
                ...state,
                answers: [ ...state.answers, newAnswer],
                answer: newAnswer,
                isForm : false,
                msg:"Done !!!"
            }; 
         case ANSWER_RESET:
            return {
                ...state,
                ANSWERState: 0,
                ANSWER:{}
            };
        case ANSWER_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                ANSWERs: changeState(state.ANSWERs, action.payload)
            }
        case ANSWER_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                answers: state.answers.filter(cat => cat.id != action.payload.id)
            }
        case ANSWER_UPDATE_SUCCESS:
            const findInd = state.answers.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.answers];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                answers : newState
            }; 
        case ANSWER_LOADING_ERROR:
        case ANSWER_ACTIVATE_FAIL:
        case ANSWER_REGISTER_FAIL:
        case ANSWER_DELETE_FAIL:
        case ANSWER_UPDATE_FAIL:
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