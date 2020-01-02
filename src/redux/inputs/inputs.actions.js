import * as types from './inputs.types'

export const setCity = (payload) => {
  return {
    type: types.UPDATE_CITY,
    payload
  }
}

export const setStartEndDate = (payload) => {
  return {
    type: types.UPDATE_START_END_DATE,
    payload
  }
}

export const setError = (payload) => {
  return {
    type: types.UPDATE_ERROR,
    payload
  }
}
