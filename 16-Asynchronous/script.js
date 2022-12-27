'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// TODO:Our First AJAX Call: XMLHttpRequest
/*
const getCountryData = function (country) {  
  const req = new XMLHttpRequest();
  // req.open('GET', `https://restcountries.com/v2/all`);
  req.open('GET', `https://restcountries.com/v2/name/${country}`);
  req.send();

  req.addEventListener('load', function () {
    
    const [data] = JSON.parse(this.responseText);
    console.log('data: ', data);

    const html = `
            <article class="country">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(2)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
              </div>
            </article> 
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  })
}
*/
// getCountryData();
// getCountryData('portugal');
// getCountryData('uzbekistan');
// getCountryData('russia');
// getCountryData('usa');
// getCountryData('china');
// getCountryData('india');

// https://restcountries.com/v2/

// console.log('this.responseText: ', this.responseText);
//! this.responseText:  undefined

// console.log('this.responseText: ', this.responseText);
// const data = JSON.parse(this.responseText)[0];           //! destructuring
// convert to JS object, because what we have now is JSON
// JSON is a big string of text 

//TODO: [OPTIONAL] How the Web Works: Requests and Responses
//TODO: Welcome to Callback Hell

const renderCountry = function (data, className = '') {
  const html = `
            <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(2)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
              </div>
            </article> 
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}

/*
const getCountryAndNeighbor = function (country) {  
  // AJAX call country 1
  const req = new XMLHttpRequest();
  req.open('GET', `https://restcountries.com/v2/name/${country}`);
  req.send();

  req.addEventListener('load', function () {
    
    const [data] = JSON.parse(this.responseText);
    console.log('data: ', data);

    // render country 1
    renderCountry(data);

    // get neighbor country 2
    const [neighbor] = data.borders;

    if (!neighbor) return;

    // AJAX call country 2
    const req2 = new XMLHttpRequest();
    req2.open('GET', `https://restcountries.com/v2/alpha/${neighbor}`);
    req2.send();

    req2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log('data2: ', data2);

      renderCountry(data2, 'neighbour');
    })
  })
}

getCountryAndNeighbor('portugal');
getCountryAndNeighbor('uzb');


//
setTimeout(() => {
  console.log('1 second passed' );
  setTimeout(() => {
    console.log('2 second passed' );
    setTimeout(() => {
      console.log('3 second passed' );
      setTimeout(() => {
        console.log('4 second passed' );         
      }, 1000)
    }, 1000)
  }, 1000)
}, 1000)
*/
// TODO: Promises and the Fetch API
// TODO: Consuming Promises

// const req = fetch('https://restcountries.com/v2/name/portugal')
// console.log('req: ', req );
// req:  Promise {<pending>}

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(function (response) {
//       console.log('response: ', response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log('data: ', data);
      
//       renderCountry(data[0]);
//     })
// }

const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => renderCountry(data[0]))
}

getCountryData('portugal')