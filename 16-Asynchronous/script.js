'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// TODO:Our First AJAX Call: XMLHttpRequest
const getCountryData = function (country) {
  
  const req = new XMLHttpRequest();
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

// https://restcountries.com/v2/

// console.log('this.responseText: ', this.responseText);
//! this.responseText:  undefined

// console.log('this.responseText: ', this.responseText);
// const data = JSON.parse(this.responseText)[0];           //! destructuring
// convert to JS object, because what we have now is JSON
// JSON is a big string of text 