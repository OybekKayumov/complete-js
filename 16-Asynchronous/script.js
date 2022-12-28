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

/*
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

// 2
Promise.resolve('Resolved promise 2')
  .then(res => {
    for (let i = 0; i < 1000000000; i++) {
      
    }
    console.log('res: ', res)
  })

console.log('Test end: ', );
//! 1 2 3 4
// Test start:  
// Test end: 
// res:  Resolved promise 1     //! FROM MICROTASKS QUEUE, has priority over Call back queue
//!2
// res:  Resolved promise 2

// 0 sec timer:

// TODO: Building a Simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening: ', );

  setTimeout(() => {
    if (Math.random() >= 0.5) { //! fulfilled promise
      resolve('You Win !')
    } else {
      reject(new Error('You lost your money'))
    }
  }, 2000)
})

lotteryPromise
  .then(res => console.log('res: ', res))
  .catch(err => console.error('error: ', err ));

// res:  You Win !
// error:  You lost your money

// promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}

wait(2).then(() => {
  console.log('I waited for 2 seconds');
  return wait(1);
}).then(() => console.log('I waited for 1 second'));

// I waited for 2 seconds
// I waited for 1 second

//todo: callback hel - how handled in promise
wait(1).then(() => {
  console.log('1 second passed');
  return wait(1);
})
  .then(() => {
    console.log('2 second passed')
    return wait(1)
  })
  .then(() => {
    console.log('3 second passed')
    return wait(1)
  })
  .then(() => {
    console.log('4 second passed')
  })

//todo: promise
Promise.resolve('abc').then(x => console.log('x: ', x))
Promise.reject(new Error('Problem!')).catch(x => console.error('x: ', x))
// x:  abc
// x:  Error: Problem!

*/

/*
// TODO:Promisifying the Geolocation API
navigator.geolocation.getCurrentPosition(
  position => console.log(position ),
  err => console.error(err)
);

console.log('Getting position');  // 1 

//
const getPosition = function () {
  return new Promise(function (resolve, reject ) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );    
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

getPosition().then(pos => console.log(pos));

//
// fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)

const whereAmI_2 = function () {
  getPosition().then(pos => {
    console.log(': ', pos .coords);
    const {latitude: lat, longitude: lng} = pos.coords;

    return fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    )
  })
  .then(res => {
    if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
    return res.json()
  })
  .then(data => {
    console.log('data: ', data);
    console.log(`You are in ${data.city}, ${data.countryName}`);
    return fetch(`https://restcountries.com/v2/name/${data.country}`);
  })
  .then(res => {
    if (!res.ok) throw new Error(`Country not found (${res.status})`);

    return res.json();
  })
  .then(data => renderCountry(data[0]))  
  .catch(err => console.error(`${err.message}!`))
}

// whereAmI();
// whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);

btn.addEventListener('click', whereAmI_2);

*/
//TODO: Consuming Promises with Async/Await
//  const resp = await fetch(`https://restcountries.com/v3/name/${country}`)
 //! same
  // fetch(`https://restcountries.com/v2/name/${country}`)
  //    .then( resp => console.log('resp: ', resp))
  
const getPosition = function () {
  return new Promise(function (resolve, reject ) {
 
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
}

// const whereAmI_3 = async function (country) {
const whereAmI_3 = async function () {
  try {// geolocaition
    const pos = await getPosition();
    const {latitude: lat, longitude: lng } = pos.coords;

    // reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();
    console.log('dataGeo: ', dataGeo);

    // country data
    const resp = await fetch(`https://restcountries.com/v2/name/${dataGeo.country}`)
    // console.log('resp: ', resp);
    const data = await resp.json();
    console.log('data: ', data);

    renderCountry(data[0])
  } catch(err) {
    console.error(err);
    renderError(`Something went wrong ${err.message}`)
  }
}

// whereAmI_3('portugal');
whereAmI_3();
console.log('FIRST: ');

//TODO: Error Handling With try...catch
// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message)
// }

