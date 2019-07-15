import React from 'react';
import DepartureTable from './DepartureTable';
import ArrivalTable from './ArrivalTable';

class Tabs extends React.Component {
  state = {
    tabShown: 'departures',
    dayOfFlight: 'today',
  }

  getTime = (string) => {
    const initialHour = String(new Date(string).getHours());
    const modifiedHour = ((initialHour).length < 2) ? `0${initialHour}` : `${initialHour}`;
    const localMinute = string.match(/(?<=:)\d\d(?!Z)/);

    return `${modifiedHour}:${localMinute}`;
  }

  changeTab = (tab) => this.setState({ tabShown: tab });

  changeDay = (day) => this.setState({ dayOfFlight: day });

  modifyFlightsByDate = (date, array) => {
    switch (date) {
      case 'yesterday':
        return array.filter(flight => new Date(flight.timeDepShedule || flight.timeToStand).getDate() === (new Date().getDate() - 1));

      default:
      case 'today':
        return array.filter(flight => new Date(flight.timeDepShedule || flight.timeToStand).getDate() === new Date().getDate());

      case 'tomorrow':
        return array.filter(flight => new Date(flight.timeDepShedule || flight.timeToStand).getDate() === (new Date().getDate() + 1));
    }
  }

  render() {
    const { departuresToShow, arrivalsToShow } = this.props;

    const columnNames = ['Terminal', 'Local time', 'Destination', 'Status', 'Airline', 'Flight'];

    const departuresSorted = [...departuresToShow]
      .sort((a, b) => this.getTime(a.timeDepShedule).localeCompare(this.getTime(b.timeDepShedule)));

    const arrivalsSorted = [...arrivalsToShow]
      .sort((a, b) => this.getTime(a.timeToStand).localeCompare(this.getTime(b.timeToStand)));

    const departuresByDate = this.modifyFlightsByDate(this.state.dayOfFlight, departuresSorted);
    const arrivalsByDate = this.modifyFlightsByDate(this.state.dayOfFlight, arrivalsSorted);

    return (
      <div className="tabs">
        <ul className="tabs__list">
          <li
            className={`
            tabs__list-item
            ${this.state.tabShown === 'departures'
              ? 'tabs__list-item--active'
              : ''
            }
          `}
            onClick={() => this.changeTab('departures')}
          >
            Departures
          </li>

          <li
            className={`
              tabs__list-item
              ${this.state.tabShown === 'arrivals'
                ? 'tabs__list-item--active'
                : ''
              }
            `}

            onClick={() => this.changeTab('arrivals')}
          >
            Arrivals
          </li>
        </ul>

        <div className="tabs__content">
          <div className="tabs__content-day">
            <button
              className={this.state.dayOfFlight === 'yesterday' ? 'day-active' : ''}
              onClick={() => this.changeDay('yesterday')}
            >
              Yesterday
            </button>

            <button
              className={this.state.dayOfFlight === 'today' ? 'day-active' : ''}
              onClick={() => this.changeDay('today')}
            >
              Today
            </button>

            <button
              className={this.state.dayOfFlight === 'tomorrow' ? 'day-active' : ''}
              onClick={() => this.changeDay('tomorrow')}
            >
              Tomorrow
            </button>
          </div>

          <table>
            <thead>
              <tr>
                {columnNames.map(item => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {this.state.tabShown === 'departures' && departuresByDate.map((departure) => (
                <DepartureTable
                  key={departure.ID}
                  departure={departure}
                  getTime={this.getTime}
                />
              ))}

              {this.state.tabShown === 'arrivals' && arrivalsByDate.map((arrival) => (
                <ArrivalTable
                  key={arrival.ID}
                  arrival={arrival}
                  getTime={this.getTime}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Tabs;
