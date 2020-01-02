import {
    INSTRUCTION_GET_MULTIPLE,
    INSTRUCTION_GET_ONE,
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
    INSTRUCTION_HIDE,
    INSTRUCTION_FORM,
    INSTRUCTION_ACTIVE,
    INSTRUCTION_DATAS
} from "../types/instruction";

let inst = localStorage.getItem('instructions') && typeof localStorage.getItem('instructions') !== 'undefined' ? JSON.parse(localStorage.getItem('instructions')): [];

const initialState = {
    isLoading: false,
    instructions: inst,
    instruction: {},
    topic: localStorage.getItem('topic') || null ,
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newINSTRUCTION = [...aluu];
    newINSTRUCTION.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newINSTRUCTION;
}

const changeINSTRUCTION = (aluu, actid) =>
{
    let newINSTRUCTION = [...aluu];
    newINSTRUCTION.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newINSTRUCTION;
}

export default function(state = initialState, action){
    switch (action.type) {
        case INSTRUCTION_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case INSTRUCTION_ACTIVE:
            return {
                ...state,
                instruction:action.payload
        };
        case INSTRUCTION_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case INSTRUCTION_EDIT:
            let ses = state.instructions.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                instruction: ses,
                isForm: true
        };
        case INSTRUCTION_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case INSTRUCTION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case INSTRUCTION_GET_MULTIPLE:
            localStorage.setItem('topic', action.topic);
            localStorage.setItem('instructions', JSON.stringify(action.payload));
            return {
                ...state,
                instructions : action.payload,
                topic: action.topic,
                msg:'DONE!!!'
            };
        case INSTRUCTION_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case INSTRUCTION_REGISTER_SUCCESS:
            let newInstruction = action.payload;
            newInstruction['id'] = action.id;
            return {
                ...state,
                instructions: [ ...state.instructions, newInstruction],
                instruction: newInstruction,
                isForm : false,
                msg:"Done !!!"
            }; 
         case INSTRUCTION_RESET:
            return {
                ...state,
                INSTRUCTIONState: 0,
                INSTRUCTION:{}
            };
        case INSTRUCTION_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                INSTRUCTIONs: changeState(state.INSTRUCTIONs, action.payload)
            }
        case INSTRUCTION_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                instructions: state.instructions.filter(cat => cat.id != action.payload.id)
            }
        case INSTRUCTION_UPDATE_SUCCESS:
            const findInd = state.instructions.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.instructions];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                instructions : newState
            }; 
        case INSTRUCTION_LOADING_ERROR:
        case INSTRUCTION_ACTIVATE_FAIL:
        case INSTRUCTION_REGISTER_FAIL:
        case INSTRUCTION_DELETE_FAIL:
        case INSTRUCTION_UPDATE_FAIL:
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