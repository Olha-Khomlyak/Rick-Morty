import {
    EPISODE_LIST,
    EPISODE_DETAILS,
    CHARACTER_LIST,
    CLEAN_CHARACTER_LIST
} from '../actions/type';

const initialState = {
    episodeList: [],
    episodeDetails:[],
    characterList: []
}

const ApiReducer = (state = initialState, action) => {
    switch (action.type) {
        case EPISODE_LIST:
            return {
                ...state,
                episodeList: action.payload
            }
        case EPISODE_DETAILS:
            return {
                ...state,
                episodeDetails: action.payload
            }
        case CHARACTER_LIST:
            return {
                ...state,
                characterList: state.characterList.concat(action.payload)
            }
        case CLEAN_CHARACTER_LIST:
            return {
                ...state,
                characterList: []
            }
        default:
            return state;
    }
}

export default ApiReducer;