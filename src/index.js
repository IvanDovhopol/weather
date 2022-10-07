import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { createMarkup } from './templates/createMarkup';
import { getWeatherByCoords, getWeatherByQuery } from './templates/weatherAPI';
import { refs } from './templates/refs';

import './sass/index.scss';

refs.form.addEventListener('submit', hundleSubmit);

const notifyOptions = {
  position: 'center-bottom',
  backOverlay: true,
  clickToClose: true,
};

navigator.geolocation?.getCurrentPosition(({ coords }) => {
  const { latitude, longitude } = coords;
  getWeatherByCoords(latitude, longitude).then(onSuccess).catch(onError);
});

function hundleSubmit(e) {
  e.preventDefault();
  const { user_country } = e.currentTarget.elements;

  const city = user_country.value.trim().toLowerCase();

  if (!city) {
    Notify.failure('Поле для поиска пустое!', notifyOptions);
    return;
  }

  getWeatherByQuery(city).then(onSuccess).catch(onError);

  e.currentTarget.reset();
}

function onError(error) {
  console.log(error.message);
  refs.box.innerHTML = '';
  Notify.failure(
    'Ошибка! Город не распознано, повторите попытку!',
    notifyOptions
  );
  return;
}

function onSuccess(data) {
  const markup = createMarkup(data);
  refs.box.innerHTML = markup;
}
