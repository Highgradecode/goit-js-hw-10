import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list')


export default fetchCountries = (name) => {
    const URL = `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`

    countryList.textContent = '';
    if (name !== '') {
        return fetch(URL)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            return Notify.failure('Oops, there is no country with that name')
        })
        .then(countries => makeCountriesMarkup(countries))
        .catch(error => console.error(error))
    };
}


const makeCountriesMarkup = (countriesArr) => {

    
    if (countriesArr.length <= 10) {
        const countriesMarkup = countriesArr.map(country => {

        if (countriesArr.length !== 1) {
            return `
        <li class='country-item'>
            <img src="${country.flags.svg}" alt="flag" height=50px width=83px>
            <h2>${country.name}</h2>
        </li>`
        } else {
            return `
            <img src="${country.flags.svg}" alt="flag" height=50px width=83px>
            <h2>${country.name}</h2>
            <h3>Capital:</h3>
            <p>${country.capital}</p>
            <h3>Population:</h3>
            <p>${country.population}</p>
            <h3>Languages:</h3>
            <p>${country.languages.map(language => {
                return language.name
            }).join(', ')}</p>
            `
        }
    }).join('')

    countryList.insertAdjacentHTML('afterbegin', countriesMarkup)
    } else {
        return Notify.info('Too many matches found. Please enter a more specific name.')
    }
};