const currentDate = new Date().toLocaleDateString('ru-RU').replace(/\./g, '-');

export const getData = () => {
  return fetch(`https://api.iev.aero/api/flights/${currentDate}`)
    .then(response => response.json());
}
