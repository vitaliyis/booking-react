import queryString from 'query-string'

const API_KEY = 'fa758c6d2acd0bb1ca3f1fc0d510ae4f'

export const fetchApiHotel = (city, startDate, endDate) => {
  // return fetch(`http://engine.hotellook.com/api/v2/cache.json?location=${city}&currency=rub&checkIn=${startDate}&checkOut=${endDate}&limit=10`)
  const queryStringParams = {
    location: city,
    currency: 'rub',
    checkIn: startDate,
    checkOut: endDate,
    limit: 10
  }
  return fetch(`http://engine.hotellook.com/api/v2/cache.json?${queryString.stringify(queryStringParams)}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log('data => ', data)

      if (data.status) return data

      let arr = []
      for (let i = 0; i < data.length; i++) {
        let hotel = {
          hotelId: data[i].hotelId,
          hotelName: data[i].hotelName,
          hotelPhoto: `https://photo.hotellook.com/image_v2/limit/h${data[i].hotelId}/800/520.auto`,
          city: data[i].location.name,
          country: data[i].location.country,
          stars: data[i].stars
        }
        arr.push(hotel)
      }

      return arr

    })
}

export const fetchApiWeather = (city) => {
  const queryStringParams = {
    q: city,
    units: 'Metric',
    APPID: API_KEY
  }
  return fetch(`http://api.openweathermap.org/data/2.5/weather?${queryString.stringify(queryStringParams)}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      return {
        temp: data.main ? data.main.temp : 'no data',
        feels_like: data.main ? data.main.feels_like : 'no data',
        wind: data.main ? data.wind.speed : 'no data',
        precipitation: data.main ? data.weather[0].main : 'no data'
      }
    })
}