import * as types from './data.types'
import {fetchApiHotel, fetchApiWeather} from "../../components/api";
import {setError} from "../inputs/inputs.actions";

export const setHotels = (payload) => {
  return {
    type: types.UPDATE_HOTELS,
    payload
  }
}

export const setWeather = (payload) => {
  return {
    type: types.UPDATE_WEATHER,
    payload
  }
}

export const setIsLoading = (payload) => {
  return {
    type: types.UPDATE_LOADING,
    payload
  }
}

// thunkCreator
export const getHotelsWeather = (city, startDate, endDate) => (dispatch) => {
  fetchApiHotel(city, startDate, endDate)
    .then(data => {
      if (data.message) {

        dispatch(setError({errorCity: data.message}))

        dispatch(setIsLoading(false))
      } else {
        dispatch(setHotels(data))

        dispatch(setIsLoading(false))
        fetchApiWeather(city)
          .then(data => {
            dispatch(setWeather(data))
          })
      }

    })
}