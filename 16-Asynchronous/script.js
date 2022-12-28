'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
            <article class="country ${className}">
              <img class="country__img" src="${data.flag}" />
              <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                  ).toFixed(2)} people</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
              </div>
            </article> 
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    // ! goes to .finally
    countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
}


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
/*
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
*/
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
// TODO: Chaining Promises
// TODO: Handling Rejected Promises
// TODO: Throwing Errors Manually
// TODO: Asynchronous Behind the Scenes: The Event Loop
// TODO: The Event Loop in Practice

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

/*
todo: rejected 1
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => response.json(), err => alert(err))
    .then((data) => {
      renderCountry(data[0]);
      const neigbour = data[0].borders[0]

      if(!neigbour) return;

      return fetch(`https://restcountries.com/v2/alpha/${neigbour}`)
      // return 34;
    })
    .then(response => response.json(), err => alert(err))
    .then(data => renderCountry(data, 'neighbour'))
}
*/

//todo: rejected 2
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => {
      console.log('response: ', response);

      if (!response.ok) 
        throw new Error(`Country not found, status: ${response.status}`)
      
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
      const neigbour = data[0].borders[0]

      if(!neigbour) return;

      return fetch(`https://restcountries.com/v2/alpha/${neigbour}`)
      // return 34;
    })
    .then(response => {
      if (!response.ok) 
        throw new Error(`Country not found, status: ${response.status}`)
    
      return response.json()
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => { 
      console.log(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥 ${err.message}. Try again!`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
}
*/


const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) 
    throw new Error(`${errorMsg}, status: ${response.status}`)

    return response.json();
  })
}

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then((data) => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0]

      if (!neighbour) throw new Error('No neighbour found!') ;

      // country 2
      return getJSON(`https://restcountries.com/v2/alpha/${neighbour}`, 'Country not found')
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => { 
      console.log(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥 ${err.message}. Try again!`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
}

btn.addEventListener('click', function () {
  getCountryData('portugal');  
})

getCountryData('australia');  //! err

//todo: The Event Loop in Practice
console.log('Test start: ', );
setTimeout(() => {
  console.log('0 sec timer: ', );
}, 0)

Promise.resolve('Resolved promise 1')
  .then(res => console.log('res: ', res))

console.log('Test end: ', );
//! 1 2 3 4
// Test start:  
// Test end: 
// res:  Resolved promise 1     //! FROM MICROTASKS QUEUE, has priority over Call back queue
// 0 sec timer: