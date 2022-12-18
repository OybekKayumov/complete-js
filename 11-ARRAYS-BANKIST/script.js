'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//-----------------------------
let arr = ['a', 'b', 'c', 'd', 'e'];

//todo: slice - extract any part of array without changing the original array
// 1- begin parameter
console.log( arr.slice(2) );
// (3) ['c', 'd', 'e']

// end parameter is not included in the output
console.log( arr.slice(2, 4) );
// (2) ['c', 'd']

// start to copy from the end of the array 
console.log( arr.slice(-2) );
// (2) ['d', 'e']

// always last element of array
console.log( arr.slice(-1) );
// ['e']

// extract from position 1 except last 2 
console.log( arr.slice(1, -2) );
// (2) ['b', 'c']

//shallow copy - call without any argument
console.log( arr.slice() );
// (5) ['a', 'b', 'c', 'd', 'e']

// spread operator
console.log([...arr] );
// (5) ['a', 'b', 'c', 'd', 'e']

//! splice - it does change the original array - MUTATE
// console.log(arr.splice(2) );
// (3) ['c', 'd', 'e']

// console.log(arr);
// (2) ['a', 'b']

// remove last element from original array
console.log(arr.splice(-1) );
// ['e']
console.log(arr);
// (4) ['a', 'b', 'c', 'd']

// deleting
arr.splice(1, 2) // from position 1 delete 2 elements
console.log(arr);
// (2) ['a', 'd']

//todo: reverse - mutate the original array
let arr1 = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse() );
// (5) ['f', 'g', 'h', 'i', 'j']

console.log(arr2);
// (5) ['f', 'g', 'h', 'i', 'j']

//todo: concat
const letters = arr1.concat(arr2);
console.log(letters);
// (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

//* same, both doesn't mutate original array 
console.log([...arr1, ...arr2] );
// (10) ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

//todo: join
console.log(letters.join('-') );
// a-b-c-d-e-f-g-h-i-j

//TODO: The new "at" method (143)
const arr3 = [23, 11, 64];
console.log(arr3[0]);      // 23

console.log(arr3.at(0) );  // 23

//! getting last array element
console.log(arr3[arr3.length - 1] );  // 64
console.log(arr3.slice(-1) );         // [64]
console.log(arr3.slice(-1)[0] );      // 64 - to take the value
console.log(arr3.at(-1) );            // 64

console.log(arr3[arr3.length] );      // undefined

//todo: "at" with string
console.log('airlines'.at(0));        // a
console.log('airlines'.at(-1));       // s

//TODO: Looping Arrays: forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for-of
for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}
// You deposited 200
// You deposited 450
// You withdrew 400
// You deposited 3000
// You withdrew 650
// You withdrew 130
// You deposited 70
// You deposited 1300

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i+1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(movement)}`);
  }
}
// Movement 1: You deposited 200
// Movement 2: You deposited 450
// Movement 3: You withdrew 400
// Movement 4: You deposited 3000
// Movement 5: You withdrew 650
// Movement 6: You withdrew 130
// Movement 7: You deposited 70
// Movement 8: You deposited 1300

// forEach
console.log('---forEach------');
movements.forEach(function (movement) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
})

// using high-order functions forEach(function)
