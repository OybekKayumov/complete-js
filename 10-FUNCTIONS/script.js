'use strict';
// Default Parameters (vn128)
// How Passing Arguments Works: Value vs. Reference (vn129)
// First-Class and Higher-Order Functions (vn130)
// Functions Accepting Callback Functions (vn131)
// Functions Returning Functions (vn132)

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

// checkIn(flight, jonas)
// console.log('flight: ', flight );
// console.log('jonas: ', jonas ); 
// flight:  LH234 //!
// jonas:  {name: 'Mr. Jonas Doe', passport: 24739479284}

//* is the same as doing...
// const flightNum = flight;
// const passenger = jonas

// example
const newPassport = function (person) {
  // get new passport number
  person.passport = Math.trunc(Math.random() * 1000000000)  
}

// newPassport(jonas);
// checkIn(flight, jonas)
// Wrong passport

//? Passing Arguments Works: Value vs. Reference
// JS does not have pass by reference
// in Objects  reference itself is still a value that contains a memory address
// we pass a reference to the function, but we do not pass by reference
// and this is an important distinction

//TODO: First-Class and Higher-Order Functions

// functions are simply values
// functions are just another "type" of objects

// we can pass functions as arguments to other functions
  // - addEventListener,
  // - event handlers,

// we can also return a function from another function

//we can call methods on functions
  // - bind: later

//* Higher-Order functions
  // 1 - a function that receives another function as an argument
  // 2 - or a function that returns a new function
  // 3 - or both

  //* 1 -a function that receives another function as an argument
  
  //* const greet = () => clog('Hey, Jonas')
  //* btnClose.addEventListener('click', greet)
  
  // "addEventListener" is a higher-order function
  // because it receives another function as an input
  // "greet" is a callback function

  //* 2 - or a function that returns a new function

  function count() {     // higher-order function
    let counter = 0;
    return function() {  // returned function
      count++;
    }
  }

// function takes string and returns a new one without any spaces in it
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
}

// fn to capitalize the first word in the string
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
}

// higher-order fn
const transformer = function (str, fn) {
  console.log(`Original string: ${str}` );
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}` );
}

transformer('JavaScript is the best!', upperFirstWord);
// Original string: JavaScript is the best!
// Transformed string: JAVASCRIPT is the best!
// Transformed by: upperFirstWord

transformer('JavaScript is the best!', oneWord);
// Original string: JavaScript is the best!
// Transformed string: javascriptisthebest!
// Transformed by: oneWord

// calling callback fn (high5) another example
// addEventListener is the higher-order fn
const high5 = function () {
  console.log('👋');
}
document.body.addEventListener('click', high5);

// using concept of callback fn
['jonas', 'martha', 'joe'].forEach(high5);
// 3 👋

//! callback fns allow us to create abstraction:
// is that we hide the details of some code implementation because we don't really care about all that detail.

//TODO: Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  }
}
// console.log( greet('Hey') )
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steve');
// Hey Jonas
// Hey Steve

//todo: closures later

// functional programming
greet('Hello')('John');
// Hello John

// use arrow functions(one arrow fn returning another arrow fn)
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);
greet('Hi')('Joe');
// Hi Joe

