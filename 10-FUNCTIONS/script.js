'use strict';
// Default Parameters (vn128)
// How Passing Arguments Works: Value vs. Reference (vn129)
const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price= 199 * numPassengers) {
  //old way, before ES6
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum, 
    numPassengers,
    price
  }

  console.log(booking);
  bookings.push(booking);
}

createBooking('LH123')
createBooking('LH123', 2, 800)
createBooking('LH123', 5)
createBooking('LH123', undefined , 100)

// {flightNum: 'LH123', numPassengers: 1, price: 199}
// {flightNum: 'LH123', numPassengers: 2, price: 800}
// {flightNum: 'LH123', numPassengers: 5, price: 995}
// {flightNum: 'LH123', numPassengers: 1, price: 100}

//TODO: 2
const flight = 'LH234';

const jonas = {
  name: 'Jonas Doe',
  passport: 24739479284
}

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999'; //!
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Checked In')
  } else {
    alert('Wrong Passport')
  }
}

checkIn(flight, jonas)
console.log('flight: ', flight );
console.log('jonas: ', jonas ); 
// flight:  LH234 //!
// jonas:  {name: 'Mr. Jonas Doe', passport: 24739479284}

// is the same as doing...
const flightNum = flight;
const passenger = jonas

// example
const newPassport = function (person) {
  // get new passport number
  person.passport = Math.trunc(Math.random() * 1000000000)  
}

newPassport(jonas);
checkIn(flight, jonas)
// Wrong passport

