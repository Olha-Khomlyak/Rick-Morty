import {
    EPISODE_LIST
} from '../actions/type';

const initialState = {
    episodeList: []
}

const ApiReducer = (state = initialState, action) => {
    switch (action.type) {
        case EPISODE_LIST:
            return {
                ...state,
                episodeList: action.payload
            }
        default:
            return state;
    }
}

export default ApiReducer;