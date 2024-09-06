import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  'live_PegsaVy0gFlIx9bQiwwLvYjMVsD4iRQBMlMNMYLFv7Q4jUvOY8HIAauI2d4IpSIx';

const selector = document.querySelector('.breed-select');
const loader = document.querySelector('p.loader');
const catInfo = document.querySelector('div.cat-info');
const error = document.querySelector('.error');

catInfo.setAttribute('hidden', '');
error.setAttribute('hidden', '');
selector.setAttribute('hidden', '');

fetchBreeds().then(data => {
  data.forEach(element => {
    var option = document.createElement('option');
    option.text = element.name;
    option.value = element.id;
    selector.add(option);
    selector.removeAttribute('hidden');
    loader.setAttribute('hidden', '');
  });
  new SlimSelect({
    select: document.querySelector('.breed-select'),
  });
});

selector.addEventListener('change', e => {
  catInfo.setAttribute('hidden', '');
  loader.removeAttribute('hidden');
  error.setAttribute('hidden', '');
  fetchCatByBreed(e.originalTarget.selectedOptions[0].value).then(data => {
    const catInfo = document.querySelector('div.cat-info');
    catInfo.innerHTML = `<img src="${data.url}" width="300px" alt="${data.breeds[0].name}"><h2>${data.breeds[0].name}</h2><p>${data.breeds[0].description}</p><p>Temperament: ${data.breeds[0].temperament}</p>`;
    loader.setAttribute('hidden', '');
    catInfo.removeAttribute('hidden', '');
  });
});
