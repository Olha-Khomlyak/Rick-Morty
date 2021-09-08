import { combineReducers } from 'redux';
import ApiReducer from './ApiReducer'
import TempDataReducer from './TempDataReducer'

export default combineReducers({
    ApiReducer: ApiReducer,
    TempDataReducer: TempDataReducer,
});