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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  })
}

displayMovements(account1.movements);
// console.log('containerMovements.innerHTML: ', containerMovements.innerHTML );

//todo: computing Usernames
const user = 'Steven Thomas Williams';  // stw

// const username = user.toLowerCase().split(' ');
// .split(' ') divide the string into words
// console.log('username: ', username);
// username:  (3) ['steven', 'thomas', 'williams']

const username = user.toLowerCase().split(' ').map((name) => {
  return name[0]
}).join('');
console.log('username: ', username); 
//username:  (3) ['s', 't', 'w']
// username:  stw                      // .join('');

// using forEach and map, create new username property in object
const createUsernames = function (accs) {  // accounts
  accs.forEach((acc) => {
    acc.username = acc.owner.toLowerCase().split(' ')
                            .map((name) => name[0])  // ['s', 't', 'w']
                            .join('');               // stw 
  });
};
createUsernames(accounts); // array accounts
console.log('accounts: ', accounts);
// accounts:  (4) [{…}, {…}, {…}, {…}]
// username: "js"


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// <!-- beforebegin -->
// <p>
//   <!-- afterbegin -->
//   foo
//   <!-- beforeend -->
// </p>
// <!-- afterend -->

// insertAdjacentElement(position, element)
// position
// 'beforebegin': Before the targetElement itself.
// 'afterbegin': Just inside the targetElement, before its first child.
// 'beforeend': Just inside the targetElement, after its last child.
// 'afterend': After the targetElement itself.


// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

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
movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
})

// using high-order functions forEach(function)

// function (currentElement, currentIndex, entireArray)
// function (movement, index, array)

movements.forEach(function(mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i+1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i+1}: You withdrew ${Math.abs(mov)}`);
  }
})

//! you cannot break forEach
//for-of you can break  

//TODO: forEach With Maps and Sets
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// key:    value 
// ['EUR', 'Euro'],

// Map
currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}` );
})

// USD: United States dollar
// EUR: Euro
// GBP: Pound sterling

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'UZS', 'USD', 'EUR', 'USD'])

console.log(currenciesUnique);
// Set(4) {'USD', 'GBP', 'UZS', 'EUR'}

// currenciesUnique.forEach((value, key, map) => {
currenciesUnique.forEach((value, _, map) => {
  // console.log(`${key}: ${value}`);
  console.log(`${value}: ${value}`);
})

// USD: USD
// GBP: GBP
// UZS: UZS
// EUR: EUR

//! Set doesn't have keys, and it doesn't have indexes either
// so there is no value that make sense for the key

// "_" means in JS a throwaway variable, it is completely unnecessary

// TODO: Data Transformations: map, filter, reduce
//! map is a similar to forEach, DIFFERENCE IS MAP CREATES A BRAND NEW ARRAY

// filter: elements for which the condition is true will be included in a NEW array 

// reduce: reduce the original array to one single value

//todo: the map method (vn150) - returns a new array
const movementsMap = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

// const movementsUSD =  movementsMap.map(function(mov, i) {
//   return mov *  euroToUsd;
// })

//* use arrow fn
const movementsUSD =  movementsMap.map((mov, i) => mov *  euroToUsd);

console.log(movementsMap, movementsUSD);
// (8) [200, 450, -400, 3000, -650, -130, 70, 1300] 
// (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

//* for-of
const movementsUSDfor = [];

for (const mov of movementsMap) {
  movementsUSDfor.push(mov * euroToUsd);
}

console.log(movementsUSDfor);
// (8) [220.00000000000003, 495.00000000000006, -440.00000000000006, 3300.0000000000005, -715.0000000000001, -143, 77, 1430.0000000000002]

//! in MAP we use function to solve the problem, new array created automatically
// for-of we simply loop over one array and manually created new array

//* map parameters
const moveDesc = movementsMap.map((mov, i, arr) => {
  // if (mov > 0) {
  //   return `Move ${i + 1}: deposit ${mov}`;
  // } else {
  //   return `Move ${i + 1}: withdrew ${Math.abs(mov)}`;
  // }
  return `Move ${i + 1}: ${mov > 0 ? 'deposit' : 'withdrew'} ${Math.abs(mov)}`;
})

console.log('moveDesc: ', moveDesc );
// moveDesc:  (8) ['Move 1: deposit 200', 'Move 2: deposit 450', 'Move 3: withdrew 400', 'Move 4: deposit 3000', 'Move 5: withdrew 650', 'Move 6: withdrew 130', 'Move 7: deposit 70', 'Move 8: deposit 1300']

//! return `Move ${i + 1}: ${mov > 0 ? 'deposit' : 'withdrew'} ${Math.abs(mov)}`;
// moveDesc:  (8) ['Move 1: deposit 200', 'Move 2: deposit 450', 'Move 3: withdrew 400', 'Move 4: deposit 3000', 'Move 5: withdrew 650', 'Move 6: withdrew 130', 'Move 7: deposit 70', 'Move 8: deposit 1300']

//! forEach creates SIDE-EFFECTS - we printed each line individually to the consol, as we were looping over the array. In each of iteration we performed some action that was visible in the consol - and we call this a side effect

// map method return each of the string from callback, and logged that entire array to the consol AND NOT THE ELEMENTS ONE BY ONE.
// and we did not create side effect in each of the iteration.
// we created a brand new array
// side effect is important in functional programming

//todo: the filter method
const deposits = movements.filter((mov) => {
  return mov > 0;
}); 

console.log('deposits: ', deposits);
// deposits:  (5) [200, 450, 3000, 70, 1300]

// for-of
const depositFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositFor.push(mov);
  }  
};

console.log('depositFor: ', depositFor);
// depositFor:  (5) [200, 450, 3000, 70, 1300]

// 
const withdrawals = movements.filter((mov) => mov < 0); 

console.log('withdrawals: ', withdrawals);
// withdrawals:  (3) [-400, -650, -130]