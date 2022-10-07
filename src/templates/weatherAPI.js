const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;

const searchParams = new URLSearchParams({
  appid: '4607a89dd5144800ba027ab82516590b',
  units: 'metric',
});

export function getWeatherByCoords(lat, lon) {
  return fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&${searchParams}`).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json('');
  });
}

export function getWeatherByQuery(city) {
  return fetch(`${BASE_URL}?q=${city}&${searchParams}`).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json('');
  });
}
