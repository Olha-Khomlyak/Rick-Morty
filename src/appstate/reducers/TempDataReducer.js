import {
    TEMP_DATA
} from '../actions/type';

const initialState = {
    tempData: []
}

const TempDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEMP_DATA:
            return {
                ...state,
                tempData: action.payload
            }
        default:
            return state;
    }
}

export default TempDataReducer;