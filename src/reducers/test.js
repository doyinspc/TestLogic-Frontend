import {
    TEST_GET_MULTIPLE,
    TEST_GET_MULTIPLE_SEC,
    TEST_GET_ONE,
    TEST_REGISTER_SUCCESS,
    TEST_REGISTER_FAIL,
    TEST_LOADING,
    TEST_LOADING_ERROR,
    TEST_ACTIVATE_FAIL,
    TEST_ACTIVATE_SUCCESS,
    TEST_UPDATE_SUCCESS,
    TEST_UPDATE_FAIL,
    TEST_DELETE_SUCCESS,
    TEST_DELETE_FAIL,
    TEST_EDIT,
    TEST_RESET,
    TEST_HIDE,
    TEST_FORM,
    TEST_ACTIVE,
    TEST_DATAS
} from "../types/test";

let inst = localStorage.getItem('tests') && typeof localStorage.getItem('tests') !== 'undefined' ? JSON.parse(localStorage.getItem('tests')): [];

const initialState = {
    isLoading: false,
    tests: inst,
    test: {},
    topic: localStorage.getItem('topic') || null ,
    testsList: [],
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newTEST = [...aluu];
    newTEST.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newTEST;
}

const changeTEST = (aluu, actid) =>
{
    let newTEST = [...aluu];
    newTEST.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newTEST;
}

export default function(state = initialState, action){
    switch (action.type) {
        case TEST_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case TEST_ACTIVE:
            return {
                ...state,
                test:action.payload
        };
        case TEST_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case TEST_EDIT:
            let ses = state.tests.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                test: ses,
                isForm: true
        };
        case TEST_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case TEST_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case TEST_GET_MULTIPLE:
            localStorage.setItem('topic', action.topic);
            localStorage.setItem('tests', JSON.stringify(action.payload));
            return {
                ...state,
                tests : action.payload,
                topic: action.topic,
                msg:'DONE!!!'
            };
         case TEST_GET_MULTIPLE_SEC:
            return {
                ...state,
                testsList : action.payload
            };
        case TEST_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case TEST_REGISTER_SUCCESS:
            let newTest = action.payload;
            newTest['id'] = action.id;
            return {
                ...state,
                tests: [ ...state.tests, newTest],
                test: newTest,
                isForm : false,
                msg:"Done !!!"
            }; 
         case TEST_RESET:
            return {
                ...state,
                TESTState: 0,
                TEST:{}
            };
        case TEST_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                TESTs: changeState(state.TESTs, action.payload)
            }
        case TEST_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                tests: state.tests.filter(cat => cat.id != action.payload.id)
            }
        case TEST_UPDATE_SUCCESS:
            const findInd = state.tests.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.tests];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                tests : newState
            }; 
        case TEST_LOADING_ERROR:
        case TEST_ACTIVATE_FAIL:
        case TEST_REGISTER_FAIL:
        case TEST_DELETE_FAIL:
        case TEST_UPDATE_FAIL:
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