import React from 'react';
import HotelsList from "./HotelsList";
import {fetchApiHotel, fetchApiWeather} from "./api";

class SearchForm extends React.Component {

  state = {
    startDate: '',
    endDate: '',
    city: '',
    hotels: [],
    isLoading: false,
    weather: {},
    errorCity: '',
    errorStart: false,
    errorEnd: false

  }

  onChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    let setError
    if (name === 'startDate') {
      setError = 'errorStart'
    } else {
      setError = 'errorEnd'
    }

    this.setState({
      [name]: value,
      [setError]: false
    })
  }

  onChangeCity = (e) => {
    this.setState({
      city: e.target.value,
      errorCity: ''
    })
  }

  onSubmit = (e) => {
    e.preventDefault();


    if (this.state.city && this.state.startDate && this.state.endDate) {

      this.setState({
        isLoading: true,
        hotels: [],
        weather: {}
      })

      fetchApiHotel(this.state.city, this.state.startDate, this.state.endDate)
        .then(data => {
          if (data.message) {
            this.setState({
              errorCity: data.message,
              isLoading: false
            })
          } else {
            this.setState({
              hotels: data,
              isLoading: false
            })
            fetchApiWeather(this.state.city)
              .then(data => {
                this.setState({
                  weather: data
                })
              })
          }

        })
    } else {
      this.setState({
        errorCity: !Boolean(this.state.city),
        errorStart: !Boolean(this.state.startDate),
        errorEnd: !Boolean(this.state.endDate)
      })
    }


    // fetchApiWeather(this.state.city)
    //   .then(data => {
    //     this.setState({
    //       weather: data
    //     })
    //   })
  }

  getCurrentDate = () => {
    let d = new Date();
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1;
    let curr_year = d.getFullYear();
    let str = curr_year + '-' + curr_month + "-" + curr_date

    this.setState({
      startDate: str
    })
  }

  componentDidMount() {
    this.getCurrentDate()
  }

  render() {
    return (
      <>
          <form>
            <div className="form-row">
              <div className="col-4 text-left">
                <input type="text"
                       className={`form-control ${this.state.errorCity ? "is-invalid" : null}`}
                       placeholder="City"
                       onChange={this.onChangeCity}
                       value={this.state.city}
                />
                {this.state.errorCity
                  ? <div className="invalid-feedback">{typeof this.state.errorCity === "boolean" ? 'required city' : this.state.errorCity}</div>
                  : null
                }

              </div>
              <div className="col-3 text-left">
                <input type="date"
                       className={`form-control ${this.state.errorStart ? "is-invalid" : null} `}
                       onChange={this.onChange}
                       value={this.state.startDate}
                       name="startDate"
                />
                {this.state.errorStart
                  ? <div className="invalid-feedback">Required date</div>
                  : null
                }
              </div>
              <div className="col-3 text-left">
                <input type="date"
                       className={`form-control ${this.state.errorEnd ? "is-invalid" : null} `}
                       onChange={this.onChange}
                       name="endDate"
                />
                {this.state.errorEnd
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
            hotels={this.state.hotels}
            isLoading={this.state.isLoading}
            weather={this.state.weather}
            messageError={this.state.messageError}
          />
      </>
    )
  }
}

export default SearchForm