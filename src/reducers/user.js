import {
    USER_GET_MULTIPLE,
    USER_GET_MULTIPLE_SEC,
    USER_GET_ONE,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOADING,
    USER_LOADING_ERROR,
    USER_ACTIVATE_FAIL,
    USER_ACTIVATE_SUCCESS,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_EDIT,
    USER_RESET,
    USER_HIDE,
    USER_FORM,
    USER_ACTIVE,
    USER_DATAS
} from "../types/user";

let inst = localStorage.getItem('users') && typeof localStorage.getItem('users') !== 'undefined' ? JSON.parse(localStorage.getItem('users')): [];

const initialState = {
    isLoading: false,
    users: inst,
    user: {},
    topic: localStorage.getItem('topic') || null ,
    usersList: [],
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newUSER = [...aluu];
    newUSER.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUSER;
}

const changeUSER = (aluu, actid) =>
{
    let newUSER = [...aluu];
    newUSER.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newUSER;
}

export default function(state = initialState, action){
    switch (action.type) {
        case USER_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case USER_ACTIVE:
            return {
                ...state,
                user:action.payload
        };
        case USER_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case USER_EDIT:
            let ses = state.users.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                user: ses,
                isForm: true
        };
        case USER_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case USER_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case USER_GET_MULTIPLE:
            localStorage.setItem('topic', action.topic);
            localStorage.setItem('users', JSON.stringify(action.payload));
            return {
                ...state,
                users : action.payload,
                topic: action.topic,
                msg:'DONE!!!'
            };
         case USER_GET_MULTIPLE_SEC:
            return {
                ...state,
                usersList : action.payload
            };
        case USER_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case USER_REGISTER_SUCCESS:
            let newUser = action.payload;
            newUser['id'] = action.id;
            return {
                ...state,
                users: [ ...state.users, newUser],
                user: newUser,
                isForm : false,
                msg:"Done !!!"
            }; 
         case USER_RESET:
            return {
                ...state,
                USERState: 0,
                USER:{}
            };
        case USER_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                USERs: changeState(state.USERs, action.payload)
            }
        case USER_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                users: state.users.filter(cat => cat.id != action.payload.id)
            }
        case USER_UPDATE_SUCCESS:
            const findInd = state.users.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.users];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                users : newState
            }; 
        case USER_LOADING_ERROR:
        case USER_ACTIVATE_FAIL:
        case USER_REGISTER_FAIL:
        case USER_DELETE_FAIL:
        case USER_UPDATE_FAIL:
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