import * as types from './inputs.types'

const initialState = {
  startDate: '',
  endDate: '',
  city: '',
  errorCity: '',
  errorStart: false,
  errorEnd: false
}

const inputsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CITY:
      return {
        ...state,
        city: action.payload
      }
    case types.UPDATE_START_END_DATE:
      return {
        ...state,
        ...action.payload
      }
    case types.UPDATE_ERROR:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default inputsReducer