//import * as actionTypes from './actions';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import * as actionTypes from './action';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const initialState = {
    isLoggedIn: false,
    email: "",
    firstname:"",
    lastname: "",
    password: ""
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.LOG_IN:
            return{
                ...state,
                isLoggedIn: true,
                email: action.getEmail
            }
        case actionTypes.GET_NAME:
            return{
                ...state,
                firstname: action.getFirstname,
                lastname: action.getLastname,
                password: action.getPassword
            }
        case actionTypes.DELETE_USER:
            return{
                ...state,
                isLoggedIn: false,
                email: "",
                firstname: "",
                lastname: ""
            }
        case actionTypes.UPDATE_USER:
            return{
                ...state,
                firstname: action.getFirstname,
                lastname: action.getLastname
            }
        case actionTypes.UPDATE_PWD:
            return{
                ...state,
                password : action.getPassword
            }
        case actionTypes.LOGOUT:
            return{
                initialState
            }
        default: 
            return state
    }
}

export default persistReducer(persistConfig, reducer);