'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// https://restcountries.com/v2/

// TODO:Our First AJAX Call: XMLHttpRequest
const req = new XMLHttpRequest();
req.open('GET', 'https://restcountries.com/v2/name/portugal');
req.send();

// console.log('this.responseText: ', this.responseText);
//! this.responseText:  undefined

// 
req.addEventListener('load', function () {
  
  const [data] = JSON.parse(this.responseText);
  console.log('data: ', data);
})

// console.log('this.responseText: ', this.responseText);
// const data = JSON.parse(this.responseText)[0];           //! destructuring
// convert to JS object, because what we have now is JSON
// JSON is a big string of text 