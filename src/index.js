import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(event) {
  let inputData = event.target.value.trim();

  if (!inputData) {
    Notiflix.Notify.info('Please write the name of country');

    cleanCountryList();
    cleanCountryInfo();
    return;
  }

  if (inputData !== ' ') {
    fetchCountries(inputData)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(countries => {
        let quantityCountries = countries.length;

        if (quantityCountries > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
          return;
        }

        if (quantityCountries >= 2 && quantityCountries <= 10) {
          cleanCountryInfo();
          createCountryList(countries);
        }

        if (quantityCountries === 1) {
          cleanCountryList();
          createCountryInfo(countries);
        }
      })
      .catch(error => {
        // console.log(error);
        Notiflix.Notify.failure('Oops, there is no country with that name');

        cleanCountryList();
        cleanCountryInfo();
      });
  }
}

function createCountryList(arrayCountries) {
  countryListRef.innerHTML = arrayCountries
    .map(
      ({ flags, name }) =>
        `
      <li class="card-item"><img
      src="${flags.svg}"
      alt="${name.official}"
      width="100"
      height="60"
      >
      <p class="card-item_text">${name.official}</p>
      </li>
      `
    )
    .join('');
}

function createCountryInfo(arrayCountries) {
  countryInfoRef.innerHTML = arrayCountries
    .map(
      ({ flags, name, capital, population, languages }) =>
        `
      <div class="country-card"><img  src="${flags.svg}" alt="${
          name.official
        }" width="100" height="60">
      <h1 class="card-title">${name.official}</h1></div>
      <ul class="country-card__list">
          <li class="country-card__item"><span class="accent-card">Capital:</span> ${capital}</li>
          <li class="country-card__item"><span class="accent-card">Population: </span> ${population}</li>
          <li class="country-card__item"><span class="accent-card">Languages: </span>${Object.values(
            languages
          )}</li>
          </ul>
    `
    )
    .join('');
}

function cleanCountryList() {
  countryListRef.innerHTML = '';
}

function cleanCountryInfo() {
  countryInfoRef.innerHTML = '';
}
