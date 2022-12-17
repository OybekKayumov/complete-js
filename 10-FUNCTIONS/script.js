'use strict';
// Default Parameters (vn128)
// How Passing Arguments Works: Value vs. Reference (vn129)
// First-Class and Higher-Order Functions (vn130)
// Functions Accepting Callback Functions (vn131)
// Functions Returning Functions (vn132)
// The call and apply Methods (vn133)
// The bind Method (vn134)

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

// TODO: The call and apply Methods
const lufthansa = {
  airline: 'Lufthansa',
  dataCode: 'LH',
  bookings: [],
  // book: function() {} // old syntax
  book(flightNum, name) {               // new syntax 
    console.log(`${name} booked a seat on ${this.airline} flight ${this.dataCode}${flightNum}`);

    this.bookings.push({flight: `${this.dataCode}${flightNum}`, name})
  }
}

lufthansa.book(239, 'Jonas Doe');
lufthansa.book(745, 'John Smith');
console.log('lufthansa booking:', lufthansa);
// Jonas Doe booked a seat on Lufthansa flight LH239
// John Smith booked a seat on Lufthansa flight LH745

//! "THIS" keyword here points to the "lufthansa" object itself

// new object
const eurowings = {
  airline: "Eurowings",
  dataCode: 'EW',
  bookings: [],
}

// take the method and store it an external function to reuse it
const book = lufthansa.book;

// try to use book, DOES NOT WORK
// book(34, 'Sarah Williams'); //! Uncaught TypeError: Cannot read properties of undefined (reading 'airline')
// book now not method, it's function now
// so THIS point to undefined

// How do to tell JavaScript explicitly or manually what "this keyword" should look like?
// there are three function methods to do that:
//! call, apply and bind

//TODO: "call" method
book.call(eurowings, 34, 'Sarah Williams')
console.log('eurowings: ',eurowings );
// Sarah Williams booked a seat on Eurowings flight EW34

// we did not call book function ourselves. instead, we called the "call" method. this "call" method will call the book function with the THIS keyword set to "eurowings" object

book.call(lufthansa, 239, 'Mary Cooper');
console.log('lufthansa: ', lufthansa);
// Mary Cooper booked a seat on Lufthansa flight LH239

//TODO: "apply" method (old)
const uzb = {
  airline: "Uzbekistan Havo yollari",
  dataCode: 'UZ',
  bookings: [],
}

const flightData = [583, 'George Cline'];
book.apply(uzb, flightData);
book.apply(eurowings, flightData);
// George Cline booked a seat on Uzbekistan Havo yollari flight UZ583
// George Cline booked a seat on Eurowings flight EW583

// call with array and spread operator
book.call(uzb, ...flightData);
// George Cline booked a seat on Uzbekistan Havo yollari flight UZ583

// TODO: The bind Method
// "bind" also allow us to manually set "this keyword" for any function call
// difference is "bind" does not immediately call the function
// instead it returns a new function where "this keyword" is bound

// book.bind(eurowings) will NOT call the book function, instead it will return a new function where "this keyword" will always be set to "eurowings" object
const bookEW = book.bind(eurowings);
bookEW(24, 'Steven Williams');
console.log('eurowings: ', eurowings );
// Steven Williams booked a seat on Eurowings flight EW24

//
const bookLH = book.bind(lufthansa);
const bookUZ = book.bind(uzb);

// pass multiply arguments
// as if first argument already set
const bookEW23 = book.bind(eurowings, 23);
// now only need a name
bookEW23('Solomon Hagan')
// Solomon Hagan booked a seat on Eurowings flight EW23
//Partial application

//TODO: with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log('this: ', this);

  this.planes++;
  console.log('this.planes: ', this.planes);
}
// we want add a new plane whenever we press this button

// document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane)

// this.planes:  NaN - not a number
// reason is "this keyword" here is a 'button' element  
// "this keyword" always points to the element on which that handler is attached to
// lufthansa.buyPlane is a handler function, and attached to .buy element (button) and inside this function "this keyword" will point to button element

// lufthansa.buyPlane()
// if we call lufthansa.buyPlane "this keyword" be lufthansa object

// manually define "this keyword" - we need to pass the function, not to call it
//! lufthansa.buyPlane.bind(lufthansa) will return a new function

document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa))

// this:  {airline: 'Lufthansa', dataCode: 'LH', bookings: Array(3), planes: 300, book: ƒ, …}
// this.planes:  301





