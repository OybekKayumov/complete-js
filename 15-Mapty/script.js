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

let map, mapEvent;

class App {
  constructor() {
    this._getPosition();
  }

  _getPosition() {
    // TODO: Using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap, function () {
        // error 
        alert('Could not get your position')
      });
    }
  }

  _loadMap(position) {    
    // success getting geolocation
    // console.log('position: ', position);

    const {latitude} = position.coords;
    const {longitude} = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}` );

    const coords = [latitude, longitude]

    map = L.map('map').setView(coords, 13);

    // L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);    

    // handling click on map
    map.on('click', function (mapE) {
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
  
    })    
  }

  _showForm() {

  }

  _toggleElevationField() {

  }

  _newWorkout() {

  }
}

const app = new App();
// app._getPosition();

// TODO: Rendering Workout Input Form
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // clear input fields
  inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''

  // display marker
  const {lat, lng} = mapEvent.latlng;
      L.marker([lat,lng]).addTo(map)
        .bindPopup(L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup'
        }))
        .setPopupContent('Workout!')
        .openPopup();
});

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});

// TODO: Project Architecture
// TODO: Refactoring for Project Architecture
