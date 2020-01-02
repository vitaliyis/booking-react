import * as types from './data.types'

const initialState = {
  hotels: [],
  isLoading: false,
  weather: {}
}

const dataFromServerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_HOTELS:
      return {
        ...state,
        hotels: action.payload
      }
    case types.UPDATE_WEATHER:
      return {
        ...state,
        weather: action.payload
      }
    case types.UPDATE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return state
  }
}

export default dataFromServerReducer