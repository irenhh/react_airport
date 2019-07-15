import React from 'react';
import PropTypes from 'prop-types';

function ArrivalTable(props) {
  const {
    term: terminal,
    timeToStand,
    'airportFromID.city_en': destination,
    status,
    codeShareData,
  } = props.arrival;

  const { getTime } = props;

  const flights = codeShareData.map(item => item.codeShare);
  const airlines = codeShareData.map(item => item.airline.en.name);
  
  const initialTime = getTime(timeToStand);
  const localTime = initialTime[0] === '0' ? initialTime.slice(1) : initialTime;

  return (
    <tr>
      <td>{terminal}</td>
      <td>{localTime}</td>
      <td>{destination}</td>
      <td>{status}</td>
      <td>{airlines.map(item => <p>{item}</p>)}</td>
      <td>{flights.map(item => <p>{item}</p>)}</td>
    </tr>
  );
}

ArrivalTable.propTypes = {
  getTime: PropTypes.func.isRequired,

  arrival: PropTypes.shape({
    term: PropTypes.string,
    timeToStand: PropTypes.string,
    'airportFromID.city_en': PropTypes.string,
    status: PropTypes.string,
    codeShareData: PropTypes.array,
  }).isRequired,
};

export default ArrivalTable;
