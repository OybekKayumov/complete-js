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
  console.log('this.responseText: ', this.responseText);
})