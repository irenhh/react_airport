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

      updatedDepartures = updatedDepartures.filter((item) => {
        const dataToFilter = (
          item['airportToID.city_en']
          + item.codeShareData.map(airline => airline.airline.en.name)
          + item.codeShareData.map(flight => flight.codeShare)
        );

        return dataToFilter.toLowerCase().search(
          prevState.filterInput.toLowerCase()
        ) !== -1;
      });

      updatedArrivals = updatedArrivals.filter((item) => {
        const dataToFilter = (
          item['airportFromID.city_en']
          + item.codeShareData.map(airline => airline.airline.en.name)
          + item.codeShareData.map(flight => flight.codeShare)
        );

        return dataToFilter.toLowerCase().search(
          prevState.filterInput.toLowerCase()
        ) !== -1;
      });

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
            type="button"
            className="App__search-button"
            onSubmit={this.filter}
          >
            Search
          </button>
        </form>

        {(departuresToShow.length > 0 && arrivalsToShow.length > 0) && (
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
