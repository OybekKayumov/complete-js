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

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);  // last 10 numbers

  constructor(coords, distance, duration){
    this.coords = coords;
    this.distance = distance;  // in km
    this.duration = duration;  // in minutes
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    this.calcPace();
  }

  calcPace() {
    // minutes/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = this.elevationGain;

    this.calcSpeed();
  }

  calcSpeed() {
    // km/hour
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178)
// const cycling1 = new Cycling([39, -12], 27, 95, 523)
// console.log(run1, cycling1);

//-----------------------------------------
// APPLICATION ARCHITECTURE
class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    
    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    // TODO: Using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
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

    this.#map = L.map('map').setView(coords, 13);

    // L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);    

    // handling click on map
    this.#map.on('click', this._showForm.bind(this))    
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    const validInputs = (...inputs) => 
      inputs.every(inp => Number.isFinite(inp));

    // get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;

    
    // if workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      
      // check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence) 
        !validInputs(distance, duration, cadence)
        ) return alert('Input has to be positive numbers!')
    }

    // if workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // check if data is valid
      if (
        !validInputs(distance, duration, elevation)
        ) return alert('Input has to be positive numbers!')
    }

    // add new object to workout array

    // render workout on map as marker
    const {lat, lng} = this.#mapEvent.latlng;
        L.marker([lat,lng]).addTo(this.#map)
          .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup'
          }))
          .setPopupContent('Workout!')
          .openPopup();

    // render workout on list

    // hide form + clear input fields

    // clear input fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
  }
}

const app = new App();


// TODO: Rendering Workout Input Form
// TODO: Project Architecture
// TODO: Refactoring for Project Architecture
// TODO: Managing Workout Data: Creating Classes
// TODO: Creating a New Workout
