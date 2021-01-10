import ACTION from '../actions/actionTypes';


const initialState = {
    isFetching: true,
    error: null,
    data: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.ACCEPT_OFFER_SUCCESS:{
            return{
                isFetching: true,
                error: null,
                data: action.data
            }
        }
        case ACTION.ACCEPT_OFFER_ERROR:{
            return{
                isFetching: true,
                error: action.error,
                data: null
            }
        }
        
        case ACTION.GET_OFFERS_SUCCESS:{
            return{
                ...state,
                isFetching: true,
                error: null,
                data: action.data
            }
        }
        case ACTION.GET_OFFERS_ERROR:{
            return{
                ...state,       
                isFetching: true,
                error: action.error,
                data: null
            }
        }
        case ACTION.ADD_NEW_CONTEST_SUCCESS:{
            return{
                isFetching: true,
                error: null,
                data: action.data
            }
        }
        case ACTION.ADD_NEW_CONTEST_ERROR:{
            return{
                isFetching: true,
                error: action.error,
                data: null
            }
        }
        case ACTION.ADD_NEW_OFFER_SUCCESS:{
            return{
                isFetching: true,
                error: null,
                data: action.data
            }
        }
        case ACTION.ADD_NEW_OFFER_ERROR:{
            return{
                isFetching: true,
                error: action.error,
                data: null
            }
        }

        case ACTION.UPDATE_CONTEST_REQUEST: {
            return {
                isFetching: true,
                error: null,
                data: null
            }
        }
        case ACTION.UPDATE_CONTEST_SUCCESS: {
            return {
                isFetching: false,
                error: null,
                data: action.data
            }
        }
        case ACTION.UPDATE_CONTEST_ERROR: {
            return {
                isFetching: false,
                error: action.error,
                data: null
            }
        }
        case ACTION.CLEAR_UPDATE_CONTEST_STORE:{
            return initialState;
        }
        default:
            return state;
    }
}

