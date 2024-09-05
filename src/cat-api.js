export const fetchBreeds = function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        //sprawdzenie błedu
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
};

export const fetchCatByBreed = function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&has_breeds=1`
  )
    .then(response => {
      if (!response.ok) {
        //sprawdzenie błedu
        throw new Error(response.status);
      }
      return response.json(); //jezleli jest typu  json
    })
    .then(data => {
      return fetch(`https://api.thecatapi.com/v1/images/${data[0].id}`)
        .then(response => {
          if (!response.ok) {
            //sprawdzenie błedu
            throw new Error(response.status);
          }
          return response.json(); //jezleli jest typu  json
        })
        .then(data => {
          return data;
        })
        .catch(error => {
          // Error handling
        });
    })
    .catch(error => {
      console.log(error);
    });
};
