import React from 'react';
import HotelsList from "./HotelsList";
import {setCity, setError, setStartEndDate} from "../redux/inputs/inputs.actions";
import {connect} from "react-redux"
import {
  setHotels, setIsLoading, setWeather,
  getHotelsWeather
} from "../redux/data-from-server/data.actions";

class SearchForm extends React.Component {

  // state = {
  //   startDate: '',
  //   endDate: '',
  //   city: '',
  //   hotels: [],
  //   isLoading: false,
  //   weather: {},
  //   errorCity: '',
  //   errorStart: false,
  //   errorEnd: false
  // }

  onChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    let setError
    if (name === 'startDate') {
      setError = 'errorStart'
    } else {
      setError = 'errorEnd'
    }

    this.props.setStartEndDate({[name]: value})
    this.props.setError({[setError]: false})
  }

  onChangeCity = (e) => {
    this.props.setCity(e.target.value)
    this.props.setError({errorCity: ''})

  }

  onSubmit = (e) => {
    e.preventDefault();
    const {city, startDate, endDate, setIsLoading, setHotels, setWeather, setError, getHotelsWeather} = this.props
    if (city && startDate && endDate) {
      setIsLoading(true)
      setHotels([])
      setWeather({})
      getHotelsWeather(city, startDate, endDate)
    } else {
      setError({errorCity: !Boolean(city)})
      setError({errorStart: !Boolean(startDate)})
      setError({errorEnd: !Boolean(endDate)})
    }

  }

  getCurrentDate = () => {
    let d = new Date();
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1;
    let curr_year = d.getFullYear();

    if (curr_date < 9) curr_date = `0${curr_date}`
    if (curr_month < 9) curr_month = `0${curr_month}`

    let str = curr_year + '-' + curr_month + "-" + curr_date

    this.props.setStartEndDate({startDate: str})
  }

  componentDidMount() {
    this.getCurrentDate()
  }

  render() {
    console.log('this.props =>>>> ', this.props)
    const {
            startDate,
            endDate,
            city,
            hotels,
            isLoading,
            weather,
            errorCity,
            errorStart,
            errorEnd
    } = this.props
    return (
      <>
          <form>
            <div className="form-row">
              <div className="col-4 text-left">
                <input type="text"
                       className={`form-control ${errorCity ? "is-invalid" : null}`}
                       placeholder="City"
                       onChange={this.onChangeCity}
                       value={city}
                />
                {errorCity
                  ? <div className="invalid-feedback">{typeof errorCity === "boolean" ? 'required city' : errorCity}</div>
                  : null
                }

              </div>
              <div className="col-3 text-left">
                <input type="date"
                       className={`form-control ${errorStart ? "is-invalid" : null} `}
                       onChange={this.onChange}
                       value={startDate}
                       name="startDate"
                />
                {errorStart
                  ? <div className="invalid-feedback">Required date</div>
                  : null
                }
              </div>
              <div className="col-3 text-left">
                <input type="date"
                       className={`form-control ${errorEnd ? "is-invalid" : null} `}
                       onChange={this.onChange}
                       value={endDate}
                       name="endDate"
                />
                {errorEnd
                  ? <div className="invalid-feedback">Required date</div>
                  : null
                }
              </div>
              <div className="col-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                >Search</button>
              </div>
            </div>
          </form>
          <HotelsList
            hotels={hotels}
            isLoading={isLoading}
            weather={weather}
          />
      </>
    )
  }
}

// state - здесь будет store.getState()
const mapStateToProps = (state) => {
  return {
    startDate: state.inputsReducer.startDate,
    endDate: state.inputsReducer.endDate,
    city: state.inputsReducer.city,
    errorCity: state.inputsReducer.errorCity,
    errorStart: state.inputsReducer.errorStart,
    errorEnd: state.inputsReducer.errorEnd,

    hotels: state.dataFromServerReducer.hotels,
    isLoading: state.dataFromServerReducer.isLoading,
    weather: state.dataFromServerReducer.weather
  }
}

const mapDispatchToProps = {
  setStartEndDate,
  setCity,
  setError,
  setHotels,
  setIsLoading,
  setWeather,
  getHotelsWeather
}

// const mapDispatchToProps = (dispatch) => {
//   return {
  //   setStartEndDate: (date, value) => dispatch(actionCreatorStartEndDate({
  //     [date]: value,
  //   })),
  //   setCity: (city) => dispatch(actionCreatorCity({
  //     city
  //   })),
  //   setError: (error, value) => dispatch(actionCreatorError({
  //     [error]: value
  // })),
  //   setHotels: (value) => dispatch(actionCreatorHotels({
  //     hotels: value
  //   })),
  //   setIsLoading: (value) => dispatch(actionCreatorLoading({
  //     isLoading: value
  //   })),
  //   setWeather: (value) => dispatch(actionCreatorWeather({
  //     weather: value
  //   })),
  //   getHotelsWeather: (city, startDate, endDate) => dispatch(getHotelsWeather(city, startDate, endDate))

    // setStartEndDate: bindActionCreators(setStartEndDate, dispatch),
    // setCity: bindActionCreators(setCity, dispatch),
    // setError: bindActionCreators(setError, dispatch),
    // setHotels: bindActionCreators(setHotels, dispatch),
    // setIsLoading: bindActionCreators(setIsLoading, dispatch),
    // setWeather: bindActionCreators(setWeather, dispatch),
    // getHotelsWeather: bindActionCreators(getHotelsWeather, dispatch),

//   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)