import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list')
const searchBox = document.querySelector('#search-box')

export default function fetchCountries(name) {
    const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages
`;
    countryList.textContent = '';
    
    if (searchBox.value !== "") {
        return fetch(URL)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            Notify.failure('"Oops, there is no country with that name"');
        })
        .then(countries => {
            renderResult(countries)
        })
        .catch(error => error)
    }
 
}


const renderResult = (countriesArr) => {

    if (countriesArr.length <= 10) {
        const markup = countriesArr.map(country => {
            if (countriesArr.length !== 1) {
                return `
                <li> <img src="${country.flags.svg}" height=30px width=50px>
                <h2>${country.name.official}</h2></li>
                `
                
            }
            
            return `<li> <img src="${country.flags.svg}" height=50px width=100px>
                <h2>${country.name.official}</h2>
                <h3>Capital:</h3>
                <p>${country.capital}</p>
                <h3>Population:</h3>
                <p>${country.population}</p>
                <h3>Languages:</h3>
                <p>${Object.values(country.languages).join(', ')}</p>
                </li>
                `
        })
            .join('')

            countryList.insertAdjacentHTML('afterbegin', markup)
    } else{
        Notify.info("Too many matches found. Please enter a more specific name.");
    }

    

   
    
};