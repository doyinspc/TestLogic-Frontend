import {
    OBJECTIVE_GET_MULTIPLE,
    OBJECTIVE_GET_ONE,
    OBJECTIVE_REGISTER_SUCCESS,
    OBJECTIVE_REGISTER_FAIL,
    OBJECTIVE_LOADING,
    OBJECTIVE_LOADING_ERROR,
    OBJECTIVE_ACTIVATE_FAIL,
    OBJECTIVE_ACTIVATE_SUCCESS,
    OBJECTIVE_UPDATE_SUCCESS,
    OBJECTIVE_UPDATE_FAIL,
    OBJECTIVE_DELETE_SUCCESS,
    OBJECTIVE_DELETE_FAIL,
    OBJECTIVE_EDIT,
    OBJECTIVE_RESET,
    OBJECTIVE_HIDE,
    OBJECTIVE_FORM,
    OBJECTIVE_ACTIVE,
    OBJECTIVE_DATAS
} from "../types/objective";


const initialState = {
    isLoading: false,
    objectives: {},
    objective: {},
    ca:null,
    datas:{},
    msg: null,
    isEdit: 0,
    isForm: false,
    showActions: false
}

const changeState = (aluu, actid) =>
{
    let newOBJECTIVE = [...aluu];
    newOBJECTIVE.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newOBJECTIVE;
}

const changeOBJECTIVE = (aluu, actid) =>
{
    let newOBJECTIVE = [...aluu];
    newOBJECTIVE.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_paid = actid.is_paid
        }
    });
    return newOBJECTIVE;
}

export default function(state = initialState, action){
    switch (action.type) {
        case OBJECTIVE_DATAS:
            return {
                ...state,
                datas:action.payload
        };
        case OBJECTIVE_ACTIVE:
            return {
                ...state,
                ca:action.payload
        };
        case OBJECTIVE_FORM:
            return {
                ...state,
                isForm : action.payload,
                isEdit : 0
        };
        case OBJECTIVE_EDIT:
            let ses = state.objectives.filter((alu)=> alu.id == action.payload)[0];
            return {
                ...state,
                isEdit : action.payload,
                objective: ses,
                isForm: true
        };
        case OBJECTIVE_HIDE:
            return {
                ...state,
                showActions : !state.showActions
        };
        case OBJECTIVE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case OBJECTIVE_GET_MULTIPLE:
            return {
                ...state,
                objectives : action.payload,
                ca: action.ca,
                msg:'DONE!!!'
            };
        case OBJECTIVE_GET_ONE:
            return {
                ...state,
                message : action.payload,
                MSG:"DONE!!!"
            };
        case OBJECTIVE_REGISTER_SUCCESS:
            let newObjective = action.payload;
            newObjective['id'] = action.id;
            return {
                ...state,
                objectives: [ ...state.objectives, newObjective],
                objective: newObjective,
                isForm : false,
                msg:"Done !!!"
            }; 
         case OBJECTIVE_RESET:
            return {
                ...state,
                OBJECTIVEState: 0,
                OBJECTIVE:{}
            };
        case OBJECTIVE_ACTIVATE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                OBJECTIVEs: changeState(state.OBJECTIVEs, action.payload)
            }
        case OBJECTIVE_DELETE_SUCCESS:
            return{
                ...state,
                msg:'DONE!!!',
                objectives: state.objectives.filter(cat => cat.id != action.payload.id)
            }
        case OBJECTIVE_UPDATE_SUCCESS:
            const findInd = state.objectives.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.objectives];
            newState[findInd] = action.payload;
            return {
                ...state,
                ...action.payload,
                objectives : newState
            }; 
        case OBJECTIVE_LOADING_ERROR:
        case OBJECTIVE_ACTIVATE_FAIL:
        case OBJECTIVE_REGISTER_FAIL:
        case OBJECTIVE_DELETE_FAIL:
        case OBJECTIVE_UPDATE_FAIL:
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