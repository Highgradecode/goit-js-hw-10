import debounce from 'lodash.debounce';
import './css/styles.css';
import fetchCountries from '../src/js/fetchCountries'


const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box')

searchBox.addEventListener('input', debounce(() => {
        fetchCountries(searchBox.value.trim())
    
}, DEBOUNCE_DELAY))
