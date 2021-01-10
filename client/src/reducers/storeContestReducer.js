import ACTION from '../actions/actionTypes';


const initialState = {
    contests: {},
    data: null,
    error: null
};


export default function (state = initialState, action) {
    switch (action.type) {
        case ACTION.GET_CONTESTS_SUCCESS: {
            return {
                ...state,
                data: action.data,
                error: null
            }
        }
        case ACTION.GET_CONTESTS_ERROR: {
            return {
                ...state,
                date: null, 
                error: action.error
            }
        }

        case ACTION.SAVE_CONTEST_TO_STORE: {
            return {
                ...state,
                contests: {...state.contests, ...{[action.data.type]: action.data.info}}
            }
        }
        case ACTION.CLEAR_CONTEST_STORE: {
            return {
                contests: {}
            }
        }
        default:
            return state;
    }
}

