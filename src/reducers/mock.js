import {
    MOCK_GET_MULTIPLE,
    MOCK_GET_MULTIPLE_SEC,
    MOCK_GET_ONE,
    MOCK_REGISTER_SUCCESS,
    MOCK_REGISTER_FAIL,
    MOCK_LOADING,
    MOCK_LOADING_ERROR,
    MOCK_ACTIVATE_FAIL,
    MOCK_ACTIVATE_SUCCESS,
    MOCK_UPDATE_SUCCESS,
    MOCK_UPDATE_FAIL,
    MOCK_DELETE_SUCCESS,
    MOCK_DELETE_FAIL,
    MOCK_EDIT,
    MOCK_RESET,
    MOCK_HIDE,
    MOCK_FORM,
    MOCK_ACTIVE,
    MOCK_DATAS
} from "../types/mock";

let inst = localStorage.getItem('mocks') && typeof localStorage.getItem('mocks') !== 'undefined' ? JSON.parse(localStorage.getItem('mocks')): [];

const initialState = {
    isLoading: false,
    mocks: inst,
    mock: {},
    topic: localStorage.getItem('topic') || null ,
    mocksList: [],
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newMOCK = [...aluu];
    newMOCK.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newMOCK;
}

const changeMOCK = (aluu, actid) =>
{
    let newMOCK = [...aluu];
    newMOCK.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newMOCK;
}

export default function(state = initialState, action){
    switch (action.type) {
        case MOCK_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case MOCK_ACTIVE:
            return {
                ...state,
                mock:action.payload
        };
        case MOCK_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case MOCK_EDIT:
            let ses = state.mocks.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                mock: ses,
                isForm: true
        };
        case MOCK_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case MOCK_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case MOCK_GET_MULTIPLE:
            localStorage.setItem('topic', action.topic);
            localStorage.setItem('mocks', JSON.stringify(action.payload));
            return {
                ...state,
                mocks : action.payload,
                topic: action.topic,
                msg:'DONE!!!'
            };
         case MOCK_GET_MULTIPLE_SEC:
            return {
                ...state,
                mocksList : action.payload
            };
        case MOCK_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case MOCK_REGISTER_SUCCESS:
            let newMock = action.payload;
            newMock['id'] = action.id;
            return {
                ...state,
                mocks: [ ...state.mocks, newMock],
                mock: newMock,
                isForm : false,
                msg:"Done !!!"
            }; 
         case MOCK_RESET:
            return {
                ...state,
                MOCKState: 0,
                MOCK:{}
            };
        case MOCK_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                MOCKs: changeState(state.MOCKs, action.payload)
            }
        case MOCK_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                mocks: state.mocks.filter(cat => cat.id != action.payload.id)
            }
        case MOCK_UPDATE_SUCCESS:
            const findInd = state.mocks.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.mocks];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                mocks : newState
            }; 
        case MOCK_LOADING_ERROR:
        case MOCK_ACTIVATE_FAIL:
        case MOCK_REGISTER_FAIL:
        case MOCK_DELETE_FAIL:
        case MOCK_UPDATE_FAIL:
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