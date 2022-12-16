'use strict';
// Default Parameters (vn128)
const bookings = [];

const createBooking = function (flightNum, numPassengers = 1, price= 199) {
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
