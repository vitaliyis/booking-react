import React from 'react';
import HotelItem from "./HotelItem";
import Preloader from "./Preloader";

class HotelsList extends React.Component {
  render() {
    const {hotels, isLoading, weather} = this.props
    return (
      <div>
        {
          isLoading ? <Preloader/> :
          hotels.length ? hotels.map((hotel) => {
            return (
              <div key={hotel.hotelId}>
                <HotelItem
                  hotel={hotel}
                  isLoading={isLoading}
                  weather={weather}
                />
              </div>
            )
          }) : null
        }
      </div>


    )
  }
}

export default HotelsList