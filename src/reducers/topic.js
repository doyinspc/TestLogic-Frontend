import {
    TOPIC_GET_MULTIPLE,
    TOPIC_GET_ONE,
    TOPIC_REGISTER_SUCCESS,
    TOPIC_REGISTER_FAIL,
    TOPIC_LOADING,
    TOPIC_LOADING_ERROR,
    TOPIC_ACTIVATE_FAIL,
    TOPIC_ACTIVATE_SUCCESS,
    TOPIC_UPDATE_SUCCESS,
    TOPIC_UPDATE_FAIL,
    TOPIC_DELETE_SUCCESS,
    TOPIC_DELETE_FAIL,
    TOPIC_EDIT,
    TOPIC_RESET,
    TOPIC_HIDE,
    TOPIC_FORM,
    TOPIC_ACTIVE
} from "../types/topic";


let top = localStorage.getItem('topics') && typeof localStorage.getItem('topics') !== 'undefined' ? JSON.parse(localStorage.getItem('topics')): [];

const initialState = {
    isLoading: false,
    topics: top,
    topic: {},
    theme: localStorage.getItem('theme') || null ,
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newTOPIC = [...aluu];
    newTOPIC.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newTOPIC;
}

const changeTOPIC = (aluu, actid) =>
{
    let newTOPIC = [...aluu];
    newTOPIC.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newTOPIC;
}

export default function(state = initialState, action){
    switch (action.type) {
        case TOPIC_ACTIVE:
            return {
                ...state,
                ca:action.payload
        };
        case TOPIC_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case TOPIC_EDIT:
            let ses = state.topics.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                topic: ses,
                isForm: true
        };
        case TOPIC_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case TOPIC_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case TOPIC_GET_MULTIPLE:
                localStorage.setItem('theme', action.theme);
                localStorage.setItem('topics', JSON.stringify(action.payload));
            return {
                ...state,
                topics : action.payload,
                theme: action.theme,
                msg:'DONE!!!'
            };
        case TOPIC_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case TOPIC_REGISTER_SUCCESS:
            let newTopic = action.payload;
            newTopic['id'] = action.id;
            return {
                ...state,
                topics: [ ...state.topics, newTopic],
                topic: newTopic,
                isForm : false,
                msg:"Done !!!"
            }; 
         case TOPIC_RESET:
            return {
                ...state,
                TOPICState: 0,
                TOPIC:{}
            };
        case TOPIC_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                TOPICs: changeState(state.TOPICs, action.payload)
            }
        case TOPIC_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                topics: state.topics.filter(cat => cat.id != action.payload.id)
            }
        case TOPIC_UPDATE_SUCCESS:
            const findInd = state.topics.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.topics];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                topics : newState
            }; 
        case TOPIC_LOADING_ERROR:
        case TOPIC_ACTIVATE_FAIL:
        case TOPIC_REGISTER_FAIL:
        case TOPIC_DELETE_FAIL:
        case TOPIC_UPDATE_FAIL:
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