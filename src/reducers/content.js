import {
    CONTENT_GET_MULTIPLE,
    CONTENT_GET_ONE,
    CONTENT_REGISTER_SUCCESS,
    CONTENT_REGISTER_FAIL,
    CONTENT_LOADING,
    CONTENT_LOADING_ERROR,
    CONTENT_ACTIVATE_FAIL,
    CONTENT_ACTIVATE_SUCCESS,
    CONTENT_UPDATE_SUCCESS,
    CONTENT_UPDATE_FAIL,
    CONTENT_DELETE_SUCCESS,
    CONTENT_DELETE_FAIL,
    CONTENT_EDIT,
    CONTENT_RESET,
    CONTENT_HIDE,
    CONTENT_FORM,
    CONTENT_ACTIVE,
    CONTENT_DATAS
} from "../types/content";


const initialState = {
    isLoading: false,
    contents: {},
    content: {},
    ca:null,
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newCONTENT = [...aluu];
    newCONTENT.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newCONTENT;
}

const changeCONTENT = (aluu, actid) =>
{
    let newCONTENT = [...aluu];
    newCONTENT.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newCONTENT;
}

export default function(state = initialState, action){
    switch (action.type) {
        case CONTENT_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case CONTENT_ACTIVE:
            return {
                ...state,
                ca:action.payload
        };
        case CONTENT_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case CONTENT_EDIT:
            let ses = state.contents.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                content: ses,
                isForm: true
        };
        case CONTENT_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case CONTENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CONTENT_GET_MULTIPLE:
            return {
                ...state,
                contents : action.payload,
                ca: action.ca,
                msg:'DONE!!!'
            };
        case CONTENT_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case CONTENT_REGISTER_SUCCESS:
            let newContent = action.payload;
            newContent['id'] = action.id;
            return {
                ...state,
                contents: [ ...state.contents, newContent],
                content: newContent,
                isForm : false,
                msg:"Done !!!"
            }; 
         case CONTENT_RESET:
            return {
                ...state,
                CONTENTState: 0,
                CONTENT:{}
            };
        case CONTENT_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                CONTENTs: changeState(state.CONTENTs, action.payload)
            }
        case CONTENT_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                contents: state.contents.filter(cat => cat.id != action.payload.id)
            }
        case CONTENT_UPDATE_SUCCESS:
            const findInd = state.contents.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.contents];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                contents : newState
            }; 
        case CONTENT_LOADING_ERROR:
        case CONTENT_ACTIVATE_FAIL:
        case CONTENT_REGISTER_FAIL:
        case CONTENT_DELETE_FAIL:
        case CONTENT_UPDATE_FAIL:
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