import React from 'react';
import PropTypes from 'prop-types';

function DepartureTable(props) {
  const {
    term: terminal,
    timeDepShedule,
    'airportToID.city_en': destination,
    status,
    codeShareData,
  } = props.departure;

  const { getTime } = props;

  const flights = codeShareData.map(item => item.codeShare);
  const airlines = codeShareData.map(item => item.airline.en.name);

  const initialTime = getTime(timeDepShedule);
  const localTime = initialTime[0] === '0' ? initialTime.slice(1) : initialTime;

  return (
    <tr>
      <td>{terminal}</td>
      <td>{localTime}</td>
      <td>{destination}</td>
      <td>{status}</td>
      <td>{airlines.map((item, i) => <p key={i}>{item}</p>)}</td>
      <td>{flights.map((item, i) => <p key={i}>{item}</p>)}</td>
    </tr>
  );
}

DepartureTable.propTypes = {
  getTime: PropTypes.func.isRequired,

  departure: PropTypes.shape({
    term: PropTypes.string,
    timeDepShedule: PropTypes.string,
    'airportToID.city_en': PropTypes.string,
    status: PropTypes.string,
    codeShareData: PropTypes.array,
  }).isRequired,
};

export default DepartureTable;
