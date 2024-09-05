import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_PegsaVy0gFlIx9bQiwwLvYjMVsD4iRQBMlMNMYLFv7Q4jUvOY8HIAauI2d4IpSIx';

const selector = document.querySelector('.breed-select');

//console.log(fetchBreeds);

fetchBreeds().then(data => {
  data.forEach(element => {
    var option = document.createElement('option');
    option.text = element.name;
    option.value = element.id;
    selector.add(option);
  });
});

selector.addEventListener('change', e => {
  fetchCatByBreed(e.originalTarget.selectedOptions[0].value).then(data => {
    console.log(data.breeds[0]);
    console.log(data);
    const catInfo = document.querySelector('div.cat-info');
    catInfo.innerHTML = `<img src="${data.url}" width="300px" alt="${data.breeds[0].name}"><h2>${data.breeds[0].name}</h2><p>${data.breeds[0].description}</p><p>Temperament: ${data.breeds[0].temperament}</p>`;
  });
});
//${data.url}
