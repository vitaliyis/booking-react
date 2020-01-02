import {combineReducers} from 'redux'
import inputsReducer from './inputs/inputs.reducer'
import dataFromServerReducer from "./data-from-server/data.reducer";

export default combineReducers({
  inputsReducer,
  dataFromServerReducer
})