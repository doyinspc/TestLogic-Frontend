import {
    THEME_GET_MULTIPLE,
    THEME_GET_MULTIPLE_SEC,
    THEME_GET_ONE,
    THEME_REGISTER_SUCCESS,
    THEME_REGISTER_FAIL,
    THEME_LOADING,
    THEME_LOADING_ERROR,
    THEME_ACTIVATE_FAIL,
    THEME_ACTIVATE_SUCCESS,
    THEME_UPDATE_SUCCESS,
    THEME_UPDATE_FAIL,
    THEME_DELETE_SUCCESS,
    THEME_DELETE_FAIL,
    THEME_EDIT,
    THEME_RESET,
    THEME_HIDE,
    THEME_FORM,
    THEME_ACTIVE
} from "../types/theme";


let the = localStorage.getItem('themes') && typeof localStorage.getItem('themes') !== 'undefined' ? JSON.parse(localStorage.getItem('themes')): [];

const initialState = {
    isLoading: false,
    themes: the,
    theme: {},
    themesList:[],
    subject: localStorage.getItem('subject') || null ,
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newTHEME = [...aluu];
    newTHEME.forEach(alu => {
        if(alu.id === actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newTHEME;
}

const changeTHEME = (aluu, actid) =>
{
    let newTHEME = [...aluu];
    newTHEME.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newTHEME;
}

export default function(state = initialState, action){
    switch (action.type) {
        case THEME_ACTIVE:
            return {
                ...state,
                ca:action.payload
        };
        case THEME_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case THEME_EDIT:
            let ses = state.themes.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                theme: ses,
                isForm: true
        };
        case THEME_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case THEME_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case THEME_GET_MULTIPLE:
            localStorage.setItem('subject', action.subject);
            localStorage.setItem('themes', JSON.stringify(action.payload));
            return {
                ...state,
                themes : action.payload,
                subject: action.subject,
                msg:'DONE!!!'
            };
         case THEME_GET_MULTIPLE_SEC:
            return {
                ...state,
                themesList : action.payload
            };
        case THEME_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case THEME_REGISTER_SUCCESS:
            let newTheme = action.payload;
            newTheme['id'] = action.id;
            return {
                ...state,
                themes: [ ...state.themes, newTheme],
                theme: newTheme,
                isForm : false,
                msg:"Done !!!"
            }; 
         case THEME_RESET:
            return {
                ...state,
                THEMEState: 0,
                THEME:{}
            };
        case THEME_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                themes: changeState(state.themes, action.payload)
            }
        case THEME_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                themes: state.themes.filter(cat => cat.id != action.payload.id)
            }
        case THEME_UPDATE_SUCCESS:
            const findInd = state.themes.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.themes];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                themes : newState
            }; 
        case THEME_LOADING_ERROR:
        case THEME_ACTIVATE_FAIL:
        case THEME_REGISTER_FAIL:
        case THEME_DELETE_FAIL:
        case THEME_UPDATE_FAIL:
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