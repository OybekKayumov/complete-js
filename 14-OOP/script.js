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

// TODO: Prototypal Inheritance and The Prototype Chain
// TODO: Prototypal Inheritance on Built-In Objects

console.log(': ', jonas.__proto__); 
// {species: 'Homo sapiens', calcAge: ƒ, constructor: ƒ}

//! object.prototype - top of prototype chain
console.log(': ', jonas.__proto__.__proto__);  // hasOwnProperty

console.log(': ', jonas.__proto__.__proto__.__proto__);  // null

//
console.dir(Person.prototype.constructor); // ! dir

//
const arr = [3,6,4,5,6,9,2,3,5];  // new Array === []
console.log(': ', arr.__proto__ ); 
// inherits all methods from Array.prototype
// [constructor: ƒ, at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, …]

console.log(': ', arr.__proto__.__proto__);  // Object

//todo; example adding a new method to prototype
Array.prototype.unique = function () {
  return [...new Set(this)]
}

console.log(': ', arr.unique());  // (6) [3, 6, 4, 5, 9, 2]

//
const h1 = document.querySelector('h1');
console.dir(h1);  // ! dir --> show all h1 object


// 
console.dir(x => x + 1);

// TODO: ES6 Classes
//! Classes are a special type of functions
//* class expressions
const PersonCl_Exp = class {}

//* class declaration
class PersonCl {
  // constructor(firstName, birthYear) {
  constructor(fullName, birthYear) {
    // this.firstName = firstName;
    this.fullName = fullName;
    this.birthYear = birthYear
  }

  // instance methods
  // method, will be added to .prototype property
  calcAge() {
    console.log(': ', 2037 - this.birthYear);
  }

  greet() {
    console.log(`Hello, ${this.firstName}`);
  }

  //getter
  get age() {
    return 2037 - this.birthYear;
  }

  //set property that already exist
  set fullName(name){
    console.log(': ', name);
    if (name.includes(' ')) {
      this._fullName = name
    } else {
      alert(`${name} is not a full name`)
    }
  }

  get fullName () {
    return this._fullName;
  }

  // static method
  static hey() {
    console.log('Hey there class');
     console.log(this);
  }
}

// const jessica = new PersonCl('Jessica', 1996);
const jessica = new PersonCl('Jessica Davis', 1996);
console.log('jessica: ', jessica);
// jessica:  PersonCl {firstName: 'Jessica', birthYear: 1996}

jessica.calcAge(); // 41

console.log(jessica.__proto__ === PersonCl.prototype );  // true

//
// PersonCl.prototype.greet = function () {
//   console.log(`Hello, ${this.firstName}`);
// }

jessica.greet();
//! Hello, Jessica

//!
// 1. Classes are NOT hoisted
      //! function declarations are hoisted, which means we can use them before they are declared in the code
      //! but with classes, that doesn't work
// 2. Class are first-class citizens - 
      // we can pass them into fns, also return them from fns
// 3. Classes are executed in strict mode
      // body of the class always executed in 'strict mode'

// TODO: Setters and Getters
// every object can have Setters and Getters properties - special assessor properties
// while more normal properties are call data properties
// Setters and Getters are fns that set and get a value, on the outside they still look like regular properties

// simple object literal
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  }
}
// add getter to this object, we can add method
console.log(': ', account.latest); // :  300,  get

account.latest = 50;  // set
console.log(': ', account.movements );
// (5) [200, 530, 120, 300, 50]

console.log(': ', jessica.age); // :  41

// const walter = new PersonCl('Walter', 1965);
const walter = new PersonCl('Walter White', 1965);
// Walter is not a full name

walter.fullName  // :  Walter White

// TODO: Static Methods
Array.from(document.querySelectorAll('h1'))

// [1,2,3].from() //! Uncaught TypeError: Cannot read properties of undefined (reading 'from')

// add static method to constructor fn
Person.hey = function () {
  console.log('Hey there');
  console.log(this);
}
Person.hey()  // Hey there
// jonas.hey()   //! Uncaught TypeError: jonas.hey is not a function

// add static method to class
PersonCl.hey();  // Hey there class
// static methods are not available on instances, they useful to implement helper fns

// TODO: Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}

const steven = Object.create(PersonProto);
console.log('steven: ', steven);

// steven:  {}            //! empty object with method calcAge
// [[Prototype]]: Object
// calcAge: ƒ calcAge()   //!
// [[Prototype]]: Object

steven.name = 'Steven';
steven.birthYear = 2002;

steven.calcAge();  // 35

console.log(': ', steven.__proto__ );  // :  {calcAge: ƒ}
console.log(': ', steven.__proto__ === PersonProto);  // true

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979)

sarah.calcAge(); // 
// Object.create creates a new object
// and prototype of this object will be the object that we passes in

// TODO: Inheritance Between "Classes": Constructor Functions
const Person1 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;  
};

Person1.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
}

const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;   //
  // this.birthYear = birthYear;   //
  // Person1(firstName, birthYear)   //! error
  Person1.call(this, firstName, birthYear)   //! this
  this.course = course; 
};

//todo: linking prototypes
Student.prototype = Object.create(Person1.prototype);

// Student.prototype = Person1.prototype; //! won't work

Student.prototype.introduce = function () {
  console.log(`my name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student('Mike', 2020, 'Computer Science');
console.log('mike: ', mike);
// mike:  
// Student {firstName: 'Mike', birthYear: 2020, course: 'Computer Science'}

mike.introduce()
// my name is Mike and I study Computer Science

mike.calcAge();  // 17 
// Student.prototype = Object.create(Person1.prototype);
// !Uncaught TypeError: mike.calcAge is not a function

console.log(mike.__proto__);  
// Person1 {introduce: ƒ}
console.log(mike.__proto__.__proto__);  

console.log(mike instanceof Student); // true
console.log(mike instanceof Person1); // true
console.log(mike instanceof Object); // true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);  // Person1...

// TODO: Inheritance Between "Classes": ES6 Classes

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //not need in PersonCl.call()
    //! always needs to happen first
    super(fullName, birthYear) 
    this.course = course;
  }

  introduce () {
    console.log(`my name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(`I'm ${2037 - this.birthYear} student` );
  }
}

// super() is the constructor fn of the parent class, and always needs to happen first. because this call o super fn is responsible for creating "this keyword" in this subclass

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science')
martha.introduce();

martha.calcAge();  // 25
// I'm 25 student

// TODO: Inheritance Between "Classes": Object.create
const PersonProto1 = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
}

const steve = Object.create(PersonProto1);

const StudentProto = Object.create(PersonProto1);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto1.init.call(this, firstName, birthYear);
  this.course = course;
}

StudentProto.introduce = function () {
  console.log(`I study ${this.course}`);
}

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science')  // in console: jay
jay.introduce();  // I study Computer Science
jay.calcAge();    //  27

// TODO: Another Class Example
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protect property, not supposed to be touched outside of the class
    this._pin = pin;
    this._movements = [];
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}` );
  }

  //* public interface
  getMovements() {
    return this._movements;
  }

  deposit(val) {
    this._movements.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  // protected, not a part of public API
  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val)
      console.log('Loan approved');
    }
  }
}
*/
/*
const acc1 = new Account('Jonas', 'EUR', 1111);
console.log('acc1: ', acc1);

// acc1.movements.push(250);
// acc1.movements.push(-150);

// acc1._movements.push(250); 
// acc1._movements.push(-150)

acc1.deposit(250);
acc1.withdraw(140);

acc1.requestLoan(1000)
acc1.approveLoan(1000)          //! should be private 

// correct way to get movements
console.log('get: ', acc1.getMovements() );
// get:  (3) [250, -140, 1000]

console.log('acc1: ', acc1);
console.log('pin: ', acc1.pin );  //! should be private

*/
// TODO: Encapsulation: Protected Properties and Methods
// TODO: Encapsulation: Private Class Fields and Methods

// 4 
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// there is also the STATIC version

class Account {
  //* 1) Public fields (will be in instances, not in prototype)
  locale = navigator.language;
  // _movements = [];
  
  //* 2) Private fields (not accessible from outside of the class)
  //    (will be in instances, not in prototype)
  #movements = [];
  #pin;  // undefined


  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // protect property, not supposed to be touched outside of the class
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}` );
  }

  //* 3) Public methods
  //* public interface
  getMovements() {
    // return this._movements;
    return this.#movements;
  }

  deposit(val) {
    // this._movements.push(val);
    this.#movements.push(val);
    return this;  // this is current object
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val)
      console.log('Loan approved');
      return this;
    }
  }

  //* Static - not will be available on all the instances, but only on the class itself
  static helper() {
    console.log('Class Static Helper ');
  }

  //* 4) Private methods
   // protected, not a part of public API
  //  #approveLoan(val) {
   _approveLoan(val) {
    return true;
  }
}

//! Public fields will be present on all the instances
//! and they are not on the Prototype

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);

console.log('acc1.getMovements: ', acc1.getMovements());
console.log('acc1: ', acc1);

// console.log('#movements: ', acc1.#movements);
//! Uncaught SyntaxError: Private field '#movements' must be declared in an enclosing class
//! NO ACCESS
//* same
// console.log('#pin: ', acc1.#pin );

//! browser see Method as a Field
// console.log('#approveLoan: ', acc1.#approveLoan );  


//static how?
Account.helper();
// Class Static Helper 

// TODO: Chaining Methods
//! error, but returning "this" make the method chainable
// acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000);
//* return this;
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000);
// Loan approved
console.log('acc1.getMovements: ', acc1.getMovements());
// acc1.getMovements:  (8) [250, -140, 1000, 300, 500, -35, 2500, -4000]

// TODO: ES6 Classes Summary
// Parent class
// extends  --> inheritance between classes, auto sets prototype
// Child class

// Public fields
// Private fields - not accessible out of the class (data privacy and encapsulation)

// Static public fields --> available only on class
//* static numSubjects = 10;

// constructor method
// super class

// instance property --> this.fullName = 'Student Name';

// Redefining private field

// Public method
// Private method: # and _method-name

// getter method: return this._testScore  
// setter method: this,_testScore = score 

// static method: helper for class, available only on class

// creating new object with "new" operator

// Remember:
// classes are syntactic sugar over constructor functions
// classes are not hoisted
// classes are first class citizens
// class body always executed in "strict mode"