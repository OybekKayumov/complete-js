'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


//---------------------------------------------
// TODO: How to Plan a Web Project
// I. PLANNING STEP
// 1. User story
// 2. Features
// 3. Flowchart - what we will build
// 4. Architecture - how we will build 

// II. DEVELOPMENT STEP

// 1. User story
  // who? what? why?

// TODO: Using the Geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    // success getting geolocation
    // console.log('position: ', position);

    const {latitude} = position.coords;
    const {longitude} = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}` );

    const coords = [latitude, longitude]

    //-----------------------
    // const map = L.map('map').setView([51.505, -0.09], 13);
    const map = L.map('map').setView(coords, 13);

    // L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // L.marker([51.5, -0.09]).addTo(map)
    // L.marker(coords).addTo(map)
    //     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    //     .openPopup();

    map.on('click', function (mapEvent) {
      const {lat, lng} = mapEvent.latlng;

      L.marker([lat,lng]).addTo(map)
        .bindPopup('Workout')
        .openPopup();
    })
    //-----------------------
  }, function () {
    // error 
    alert('Could not get your position')
  });
}