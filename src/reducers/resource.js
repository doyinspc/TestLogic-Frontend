import {
    RESOURCE_GET_MULTIPLE,
    RESOURCE_GET_MULTIPLE_SEC,
    RESOURCE_GET_ONE,
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
    RESOURCE_HIDE,
    RESOURCE_FORM,
    RESOURCE_ACTIVE
} from "../types/resource";


let the = localStorage.getItem('resources') && typeof localStorage.getItem('resources') !== 'undefined' ? JSON.parse(localStorage.getItem('resources')): [];

const initialState = {
    isLoading: false,
    resources: the,
    resource: {},
    resourcesList:[],
    topic: localStorage.getItem('topic') || null ,
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newRESOURCE = [...aluu];
    newRESOURCE.forEach(alu => {
        if(alu.id === actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newRESOURCE;
}

const changeRESOURCE = (aluu, actid) =>
{
    let newRESOURCE = [...aluu];
    newRESOURCE.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newRESOURCE;
}

export default function(state = initialState, action){
    switch (action.type) {
        case RESOURCE_ACTIVE:
            return {
                ...state,
                ca:action.payload
        };
        case RESOURCE_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case RESOURCE_EDIT:
            let ses = state.resources.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                resource: ses,
                isForm: true
        };
        case RESOURCE_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case RESOURCE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case RESOURCE_GET_MULTIPLE:
            localStorage.setItem('subject', action.subject);
            localStorage.setItem('resources', JSON.stringify(action.payload));
            return {
                ...state,
                resources : action.payload,
                subject: action.subject,
                msg:'DONE!!!'
            };
         case RESOURCE_GET_MULTIPLE_SEC:
            return {
                ...state,
                resourcesList : action.payload
            };
        case RESOURCE_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case RESOURCE_REGISTER_SUCCESS:
            let newResource = action.payload;
            newResource['id'] = action.id;
            return {
                ...state,
                resources: [ ...state.resources, newResource],
                resource: newResource,
                isForm : false,
                msg:"Done !!!"
            }; 
         case RESOURCE_RESET:
            return {
                ...state,
                RESOURCEState: 0,
                RESOURCE:{}
            };
        case RESOURCE_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                resources: changeState(state.resources, action.payload)
            }
        case RESOURCE_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                resources: state.resources.filter(cat => cat.id != action.payload.id)
            }
        case RESOURCE_UPDATE_SUCCESS:
            const findInd = state.resources.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.resources];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                resources : newState
            }; 
        case RESOURCE_LOADING_ERROR:
        case RESOURCE_ACTIVATE_FAIL:
        case RESOURCE_REGISTER_FAIL:
        case RESOURCE_DELETE_FAIL:
        case RESOURCE_UPDATE_FAIL:
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