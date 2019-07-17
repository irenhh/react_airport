import React from 'react';
import { getData } from './getData';
import Tabs from './Tabs';


class Schedule extends React.Component {
  state = {
    departures: [],
    departuresToShow: [],
    arrivals: [],
    arrivalsToShow: [],
    filterInput: '',
  }

  componentDidMount = () => {
    getData().then(result => {
      const departures = result.body.departure.map(item => (
        {
          ...item,
        }
      ));

      const arrivals = result.body.arrival.map(item => (
        {
          ...item,
        }
      ));

      this.setState({
        departures,
        departuresToShow: departures,
        arrivals,
        arrivalsToShow: arrivals,
      })
    });
  }

  getInputData = (event) => {
    this.setState({
      filterInput: event.target.value,
    })
  }

  filter = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      let updatedDepartures = prevState.departures;
      let updatedArrivals = prevState.arrivals;

      function filterFlights(arrayItem) {
        const dataToFilter = (
          (arrayItem['airportToID.city_en'] || arrayItem['airportFromID.city_en'])
          + arrayItem.codeShareData.map(airline => airline.airline.en.name)
          + arrayItem.codeShareData.map(flight => flight.codeShare)
        );

        return dataToFilter.toLowerCase().search(
          prevState.filterInput.toLowerCase()
        ) !== -1;
      }

      updatedDepartures = updatedDepartures.filter(item => filterFlights(item));
      updatedArrivals = updatedArrivals.filter(item => filterFlights(item));

      return {
        departuresToShow: updatedDepartures,
        arrivalsToShow: updatedArrivals
      };
    });
  }

  render() {
    const { departuresToShow, arrivalsToShow } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Search flight</h1>

        <form className="App__search" onSubmit={this.filter}>
          <input
            type="text"
            placeholder="Airline, destination or flight #"
            className="App__search-input"
            onChange={this.getInputData}
          />

          <button
            type="submit"
            className="App__search-button"
          >
            Search
          </button>
        </form>

        {(departuresToShow.length > 0 || arrivalsToShow.length > 0) && (
          <Tabs
            departuresToShow={departuresToShow}
            arrivalsToShow={arrivalsToShow}
          />
        )}
      </div>
    )
  }
}

export default Schedule;
