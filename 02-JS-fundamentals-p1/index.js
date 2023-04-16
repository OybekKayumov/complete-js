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
birthYear = 1992; //! typeError

// const job;  //! syntax error
