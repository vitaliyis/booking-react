import React from 'react';

class HotelItem extends React.Component {
  render() {
    const {hotel, weather} = this.props
    return (
      <div className="card mt-3" style={{maxWidth: '100%'}}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={hotel.hotelPhoto} className="w-100" alt=""/>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="row">
                <div className="col-8">
                  <div className="text-left">
                    <span className="card-title d-inline-block hotel-title">hotel name:</span>
                    <h5 className="card-title d-inline-block">{hotel.hotelName}</h5>
                  </div>
                  <div className="text-left">
                    <span className="card-title hotel-title d-inline-block">city:</span>
                    <h5 className="card-title d-inline-block">{hotel.city}</h5>
                  </div>
                  <div className="text-left">
                    <span className="card-title hotel-title d-inline-block">country:</span>
                    <h5 className="card-title d-inline-block">{hotel.country}</h5>
                  </div>
                  <div className="text-left">
                    <span className="card-title hotel-title d-inline-block">stars:</span>
                    <h5 className="card-title d-inline-block">{hotel.stars}</h5>
                  </div>
                </div>
                <div className="col-4">
                  <h5 className="card-title text-left">Weather</h5>
                  <div className="text-left">
                    <span className="weather-title d-inline-block card-title">temp:</span>
                    <span className="d-inline-block">{weather.temp} &deg; C</span>
                  </div>
                  <div className="text-left">
                    <span className="weather-title d-inline-block card-title">feels like:</span>
                    <span className="d-inline-block card-title">{weather.feels_like} &deg;C</span>
                  </div>
                  <div className="text-left">
                    <span className="weather-title d-inline-block card-title">wind:</span>
                    <span className="d-inline-block card-title">{weather.wind} m/s</span>
                  </div>
                  <div className="text-left">
                    <span className="weather-title d-inline-block card-title">precip:</span>
                    <span className="d-inline-block card-title">{weather.precipitation}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HotelItem