import {
    SUBJECT_GET_MULTIPLE,
    SUBJECT_GET_ONE,
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
    SUBJECT_HIDE,
    SUBJECT_FORM,
    SUBJECT_ACTIVE,
    SUBJECT_DATAS
} from "../types/subject";
//localStorage.clear()
let sub = localStorage.getItem('subjects') && typeof localStorage.getItem('subjects') !== 'undefined' ? JSON.parse(localStorage.getItem('subjects')): [];

const initialState = {
    isLoading: false,
    subjects: sub,
    subject: {},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newSUBJECT = [...aluu];
    newSUBJECT.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newSUBJECT;
}

const changeSUBJECT = (aluu, actid) =>
{
    let newSUBJECT = [...aluu];
    newSUBJECT.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newSUBJECT;
}

export default function(state = initialState, action){
    switch (action.type) {
        case SUBJECT_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case SUBJECT_ACTIVE:
            return {
                ...state,
                ca:action.payload
        };
        case SUBJECT_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case SUBJECT_EDIT:
            let ses = state.subjects.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                subject: ses,
                isForm: true
        };
        case SUBJECT_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case SUBJECT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case SUBJECT_GET_MULTIPLE:
            localStorage.setItem('subjects', JSON.stringify(action.payload));
            return {
                ...state,
                subjects : action.payload,
                msg:'DONE!!!'
            };
        case SUBJECT_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case SUBJECT_REGISTER_SUCCESS:
            let newSubject = action.payload;
            return {
                ...state,
                subjects: [ ...state.subjects, newSubject],
                subject: newSubject,
                isForm : false,
                msg:"Done !!!"
            }; 
         case SUBJECT_RESET:
            return {
                ...state,
                SUBJECTState: 0,
                SUBJECT:{}
            };
        case SUBJECT_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                SUBJECTs: changeState(state.SUBJECTs, action.payload)
            }
        case SUBJECT_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                subjects: state.subjects.filter(cat => cat.id != action.payload.id)
            }
        case SUBJECT_UPDATE_SUCCESS:
            const findInd = state.subjects.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.subjects];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                subjects : newState
            }; 
        case SUBJECT_LOADING_ERROR:
        case SUBJECT_ACTIVATE_FAIL:
        case SUBJECT_REGISTER_FAIL:
        case SUBJECT_DELETE_FAIL:
        case SUBJECT_UPDATE_FAIL:
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