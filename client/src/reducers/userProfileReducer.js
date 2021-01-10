import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
    profileModeView: CONSTANTS.USER_INFO_MODE,
    isEdit: false,
    data: null,
    error: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_ALL_USERS_SUCCESS:{
            return{
                ...state,
                error: null,
                data: action.data
            }
        }
        case ACTION.GET_ALL_USERS_ERROR:{
            return{
                ...state,
                error: action.error,
                data: null
            }
        }
        case ACTION.CHANGE_PROFILE_MODE_VIEW:{
            return{
                ...state,
                profileModeView: action.data
            }
        }
        case ACTION.CHANGE_EDIT_MODE_ON_USER_PROFILE:{
            return{
                ...state,
                isEdit: action.data
            }
        }
        default:
            return state;
    }
}
