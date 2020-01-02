import {
    DISTRACTOR_GET_MULTIPLE,
    DISTRACTOR_GET_ONE,
    DISTRACTOR_REGISTER_SUCCESS,
    DISTRACTOR_REGISTER_FAIL,
    DISTRACTOR_LOADING,
    DISTRACTOR_LOADING_ERROR,
    DISTRACTOR_ACTIVATE_FAIL,
    DISTRACTOR_ACTIVATE_SUCCESS,
    DISTRACTOR_UPDATE_SUCCESS,
    DISTRACTOR_UPDATE_FAIL,
    DISTRACTOR_DELETE_SUCCESS,
    DISTRACTOR_DELETE_FAIL,
    DISTRACTOR_EDIT,
    DISTRACTOR_RESET,
    DISTRACTOR_HIDE,
    DISTRACTOR_FORM,
    DISTRACTOR_ACTIVE,
    DISTRACTOR_DATAS
} from "../types/distractor";


const initialState = {
    isLoading: false,
    distractors: {},
    distractor: {},
    ca:null,
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newDISTRACTOR = [...aluu];
    newDISTRACTOR.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newDISTRACTOR;
}

const changeDISTRACTOR = (aluu, actid) =>
{
    let newDISTRACTOR = [...aluu];
    newDISTRACTOR.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newDISTRACTOR;
}

export default function(state = initialState, action){
    switch (action.type) {
        case DISTRACTOR_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case DISTRACTOR_ACTIVE:
            return {
                ...state,
                ca:action.payload
        };
        case DISTRACTOR_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case DISTRACTOR_EDIT:
            let ses = state.distractors.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                distractor: ses,
                isForm: true
        };
        case DISTRACTOR_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case DISTRACTOR_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case DISTRACTOR_GET_MULTIPLE:
            return {
                ...state,
                distractors : action.payload,
                ca: action.ca,
                msg:'DONE!!!'
            };
        case DISTRACTOR_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case DISTRACTOR_REGISTER_SUCCESS:
            let newDistractor = action.payload;
            newDistractor['id'] = action.id;
            return {
                ...state,
                distractors: [ ...state.distractors, newDistractor],
                distractor: newDistractor,
                isForm : false,
                msg:"Done !!!"
            }; 
         case DISTRACTOR_RESET:
            return {
                ...state,
                DISTRACTORState: 0,
                DISTRACTOR:{}
            };
        case DISTRACTOR_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                DISTRACTORs: changeState(state.DISTRACTORs, action.payload)
            }
        case DISTRACTOR_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                distractors: state.distractors.filter(cat => cat.id != action.payload.id)
            }
        case DISTRACTOR_UPDATE_SUCCESS:
            const findInd = state.distractors.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.distractors];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                distractors : newState
            }; 
        case DISTRACTOR_LOADING_ERROR:
        case DISTRACTOR_ACTIVATE_FAIL:
        case DISTRACTOR_REGISTER_FAIL:
        case DISTRACTOR_DELETE_FAIL:
        case DISTRACTOR_UPDATE_FAIL:
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