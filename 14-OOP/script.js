'use strict';

//TODO: Constructor Functions and the new Operator
// fn expression here, but fn declaration will also work
// arrow fn will NOT work as a fn constructor, because arrow fn doesn't have its own "this keyword"
// we need "this keyword"
const Person = function (firstName, birthYear) {
  // console.log('this: ', this );
  //* instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // method, not create methods inside constructor, will have a many copies
  // for each instance will calculate 
  // this.calcAge = function () {
  //   console.log(': ', 2037- this.birthYear );
  // }
}
//* this:  Person {}

// call Person fn
new Person('Jonas', 1991);
// 4 steps
// 1. new empty {} Object is created
// 2. fn is called and "this keyword" will be set to this newly created object
// - this = {}
// 3. new object will be linked to Prototype
// 4. created object will automatically returned from constructor fn

const jonas = new Person('Jonas', 1991);
console.log('jonas: ', jonas);
// jonas:  Person {firstName: 'Jonas', birthYear: 1991}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);

console.log(': ', matilda, jack);

//! object, created from a class is called an instance

console.log(': ', jonas instanceof Person); //  true

//TODO: Prototypes
//! each and every fn in JS automatically has a property called Prototype

console.log(': ', Person.prototype);
Person.prototype.calcAge = function () {
    console.log(': ', 2037- this.birthYear );
  }
// we have only 1 copy of calcAge method, and all objects, created using this constructor fn have access to this method 
jonas.calcAge();  // 46


//todo: step 3
console.log(': ', jonas.__proto__); //  {calcAge: ƒ, constructor: ƒ}

console.log(': ', jonas.__proto__ === Person.prototype);  // true

console.log(': ', Person.prototype.isPrototypeOf(jonas));  // true

console.log(': ', Person.prototype.isPrototypeOf(Person));  //! false

// 
Person.prototype.species = 'Homo sapiens';
console.log(': ', jonas);
// {
//   "firstName": "Jonas",
//   "birthYear": 1991
// }
// [[Prototype]]: Object
// calcAge: ƒ ()
// species: "Homo sapiens"

console.log(': ', jonas.species, matilda.species);
// :  Homo sapiens Homo sapiens

console.log(': ', jonas.hasOwnProperty('firstName'));  // true
console.log(': ', jonas.hasOwnProperty('species'));  //! false, not inside of jonas object, only has access to species method because of its prototype
// because it is in the prototype property of person
