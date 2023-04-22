// JS is a high-level, object-oriented, multi-paradigm programming language
// high-level - which means that we don't have to think how to managing the computer's memory while it runs or program, there are a lot of so-called abstractions over all these small details that we don't want to worry about. And this makes the language a lot easier to write and to learn.

// multi-paradigm -  we can use all kinds of different programming styles, such as imperative and declarative programming

// HTML - CSS - JS
// Content - Presentation - Building web applications
// Nouns - Adjectives - Verbs

// JS - dynamic effects and web apps in the browser, Front-end
   // - web-app on web-servers                     , Back-end

let js = 'amazing';
if (js === 'amazing') {
  // alert ('JS is Fun')
  console.log('JS is Fun');
} 

console.log(40 + 8 + 23 - 10);  //61

// 10. Values and Variables
console.log('JavaScript');
console.log(34);

let fName = "John";
console.log(fName);

// variable name conventions
// camelCase

// let 3years = 3  //! syntax err
// john&bob = 'JB' 
// let new = 45;
// let function = 32;
// let Person = 'Joe'

let PI = 3.1415;

let myFirstJob = 'Programmer';
let myCurrentJob = 'Teacher';

// let job1 = 'programmer';  // ? not recommended
// let job2 = 'teacher';

console.log(myFirstJob);

// 12. Data Types
// value 
    // 1. object
    // 2. or primitive 

    // primitive data types are 7
      // Number
      // String
      // Boolean
      // undefined
      // null
      // Symbol
      // BigInt

// Number - used for decimals and integers. Floating point numbers
let age = 48.0;
// String
let lastName = 'Doe';
// Boolean true or false
// undefined
  // not yet defined, empty value
  let children;

// null also means empty value

// Symbol - value that is unique and cannot be changed
// BigInt 

// JS has dynamic typing
  //! value has type, NOT variable

let jsIsFun = true;
console.log(jsIsFun);

console.log(typeof true);  // boolean
console.log(typeof 25);    // number
console.log(typeof 'joe'); // string

// dynamic typing example
jsIsFun = 'Yes!';   // not use let
// we changed value, from boolean to string

// undefined
let year;
console.log(year);         // undefined
console.log(typeof year);  // undefined
// both "value" and "type of the value" are undefined

year = 2023;  // number

// null
console.log(typeof null);  // object  - bug in JavaScript

// 13. let, const and var
let newAge = 30;
newAge = 31;  // mutated variable

const birthYear = 1991;
// birthYear = 1992; //! typeError

// const job;  //! syntax error

var job = 'programmer';
job = 'teacher';

// var is function scope
// let is block scope

lastName = 'Doe';
console.log(lastName);
// create property on the global object

// 14. Basic Operators
const ageJohn = 2023 - 1991;
const ageSarah = 2023 - 2018;
console.log(ageJohn, ageSarah);

const now = 2023;
const ageJoe = now - 2011;

console.log(ageJohn * 2, ageJohn / 10, 2**3); 
// 2 ** 3 => 2*2*2, 2 to the power of 3

const firstName = 'John';
const lName = 'Doe';

console.log(firstName + ' ' + lName);

let x = 10 + 5   // assignment operator =
x += 10;         // x = x + 10
x *= 4;          // x = x * 4
x++;             // x = x + 1
x--;             // x = x - 1
console.log(x);

// comparison operators
ageJoe > ageSarah  // true;
// <, >, >=, <=

console.log(ageSarah >= 18 );   // false

const  isFullAge = ageSarah >= 18;


// 15. Operator Precedence
console.log(now - 1991 > now - 2018);

// right-to-left
console.log(25 - 10 - 5);

let x1, y1;
x1 = y1 = 25 - 10 - 5;
console.log(x1, y1);     // 10 10

const averageAge = ageJohn + ageSarah / 2;
const averageAge2 = (ageJohn + ageSarah )/ 2;
console.log(ageJohn, ageSarah, averageAge, averageAge2);

// 16. Coding Challenge #1
const massMark = 78;
const massJohn = 92;
const heightMark = 1.69;
const heightJohn = 1.95;

// const bmiMark = massMark / (heightMark * heightMark);
const bmiMark = massMark / heightMark ** 2;
const bmiJohn = massJohn / (heightJohn * heightJohn);

const markHigherBMI = bmiMark > bmiJohn;

console.log(bmiMark, bmiJohn, markHigherBMI);
// 27.309968138370508 24.194608809993426 true

// test 2
const massMark2 = 95;
const massJohn2 = 85;
const heightMark2 = 1.88;
const heightJohn2 = 1.76;

// const bmiMark = massMark / (heightMark * heightMark);
const bmiMark2 = massMark2 / heightMark2 ** 2;
const bmiJohn2 = massJohn2 / (heightJohn2 * heightJohn2);

const markHigherBMI2 = bmiMark2 > bmiJohn2;

console.log(bmiMark2, bmiJohn2, markHigherBMI2);
// 26.87867813490267 27.44059917355372 false

// 17. Strings and Template Literals
const nameFirst = 'John';
const work = 'teacher';
const yearBirth = 1991;
const curr = 2023;

const john = "I'm " + nameFirst + ", a " + (curr - yearBirth) + " years old " + work + "!";

console.log(john);
// I'm John, a 32 years old teacher!

const johnNew = `I'm ${nameFirst}, a ${curr-yearBirth} years old ${work}!`;
console.log(johnNew);

console.log(`Just a regular string...`);

console.log('String with \n\
  multiple \n\
  lines ');
// String with
// multiple
// lines

console.log(`String with 
  multiple
  lines `);


// 18. Taking Decisions: if / else Statements
const ageNew = 19;
const isOldEnough = ageNew >= 18;

if (isOldEnough) {
  console.log('Sarah can start driving license 🚙🚗');
} else {
  
}