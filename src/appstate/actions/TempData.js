import {
    TEMP_DATA
} from './type';

export const setTempData = (data) => (dispatch) => {
    dispatch({
        type: TEMP_DATA,
        payload: data
    })
}