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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  //todo: sort copy of original array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  // movements.forEach(function (mov, i) {
  movs.forEach(function (mov, i) {
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

// displayMovements(account1.movements);
// console.log('containerMovements.innerHTML: ', containerMovements.innerHTML );

//todo: reduce
const calcDisplayBalance = ((acc) => {
  // const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  // acc.balance = balance;
  // labelBalance.textContent = `${balance}€`;

  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
});

// calcDisplayBalance(account1.movements);

// todo: get summary, chaining
const calcDisplaySummary = (acc) => {
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, curr) => acc + curr, 0)
  labelSumIn.textContent = `${incomes}€`  

  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, curr) => acc + curr, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;

  const interest = acc.movements.filter(mov => mov > 0)
                  .map(deposit => deposit * acc.interestRate/100)
                  .filter((int, i, arr) => {
                    console.log(arr); //! [2.4, 5.4, 36, 0.84, 15.6] -> (-0.84) 
                    return int >= 1;
                  })
                  .reduce((acc, curr) => acc + curr, 0)
  labelSumInterest.textContent = `${interest}€`;
}

// calcDisplaySummary(account1.movements);

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

//todo: updateUI helper fn
const updateUI = (acc) => {
  // display movements
  // displayMovements(currentAccount.movements)
  displayMovements(acc.movements)

  // display balance
  calcDisplayBalance(acc);

  // display summary
  calcDisplaySummary(acc);
  
}

//todo: event handler
let currentAccount;

btnLogin.addEventListener('click', (e) => {
  e.preventDefault();
  
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(': ', currentAccount);
  
  //! optional chaining "?"
  if (currentAccount?.pin === Number(inputLoginPin.value)) {  
    // display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear input fields,"=" assignment operator works from right to left
    inputLoginUsername.value = inputLoginPin.value = '';
    //* lose blinking cursor focus 
    inputLoginPin.blur();
    
    // display movements
    // displayMovements(currentAccount.movements)
    // display balance
    // calcDisplayBalance(currentAccount);
    // display summary
    // calcDisplaySummary(currentAccount);

    // update UI
    updateUI(currentAccount);

    console.log('LOGIN');
  }
})

//todo: implementing transfers
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  // console.log(': ', amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (amount > 0 && 
    receiverAcc && //! if receiver exist or '?'
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username) {
      console.log('Transfer valid: ', );
      currentAccount.movements.push(-amount);
      receiverAcc.movements.push(amount);

      // update UI
      updateUI(currentAccount);
  }
})

//todo: some
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  // if amount bigger than 10% of loan
  if(
    amount > 0 && 
    currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  
  inputLoanAmount.value = '';
})

//todo: findIndex - close account
btnClose.addEventListener('click', (e) => {
  e.preventDefault();
  
  if (
    inputCloseUsername.value === currentAccount.username && 
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
        );
    // console.log('index: ', index );
    
    // delete account
    accounts.splice(index, 1);  // mutate the original array

    // hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
})

//todo: sort event listener
let sorted = false;  // not sorted;


btnSort.addEventListener('click', (e) => {
  e.preventDefault();

  // displayMovements(currentAccount.movements, true);  // sort = true;
  displayMovements(currentAccount.movements, !sorted);  // opposite;
  sorted = !sorted;
})

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

//todo: the reduce method
// accumulator is like a SNOWBALL
const balance = movements.reduce((acc, curr, i, arr) => {
  console.log(`Iteration ${i}: ${acc} and ${curr}`);
  return acc + curr
}, 0)  // 0 is a initial value

console.log('balance: ', balance );  // 3840

// for-of
let balanceFor = 0;
for (const mov of movements) {
  balanceFor += mov
}
console.log('balanceFor: ', balanceFor);
// balanceFor:  3840

//todo: Get the maximum value of movements array
const max = movements.reduce((acc, mov) => {
  if(acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0])    // 1st element of array

console.log('max : ', max);  // max :  3000

// TODO: the magic of chaining methods
const euroToUsd1 = 1.1;
const totalDepositsUSD = movements.filter(mov => mov > 0).map(mov => mov * euroToUsd1).reduce((acc, curr) => acc + curr, 0);
console.log('totalDepositsUSD: ', totalDepositsUSD); 
// totalDepositsUSD:  5522.000000000001

const totalDepositsUSD_2 = movements
            .filter(mov => mov > 0)       //! < negative
            .map((mov, i, arr) => {
              console.log('arr: ', arr);  //* arr:  (3) [-400, -650, -130]
              mov * euroToUsd1
            })
            .reduce((acc, curr) => acc + curr, 0);


// not overuse chaining, problems with big array data
// like splice or reverse methods are mutate original array - we should avoid mutating arrays

// todo: the find method - returns first element for which this operation becomes true
const firstWithdrawal = movements.find(mov => mov < 0);
console.log('movements: ', movements );
console.log('firstWithdrawal: ', firstWithdrawal );
// movements:  (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// firstWithdrawal:  -400

// filter returns all elements that match the condition
// find returns first one
// filter returns a NEW array, find only returns the element itself. and not an array

console.log('accounts object: ', accounts );

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log('account: ', account);
// account:  {
//     "owner": "Jessica Davis",
//     "movements": [
//         5000,
//         3400,
//         -150,
//         -790,
//         -3210,
//         -1000,
//         8500,
//         -30
//     ],
//     "interestRate": 1.5,
//     "pin": 2222,
//     "username": "jd"
// }

//* find method will return UNDEFINED, if no element matches the condition
//! Uncaught TypeError: Cannot read properties of undefined (reading 'pin')

//TODO: implementing login
//TODO: implementing transfers
//TODO: the findIndex method
// The findIndex Method returns the index of the found element and NOT the element itself
// to delete an element from an array we can use "splice" and index at which we want to delete. 

//! with indexOf we can search for a value that is in the array - true or false
// and also returns index of element but more simpler  

// TODO: some and every
console.log('movements: ', movements);
// EQUALITY
console.log('includes?',movements.includes(-130));  // true

// CONDITION
console.log(movements.some(mov => mov === -130) );  // same as includes

const anyDeposits = movements.some((mov) => mov > 0);
console.log('anyDeposits: ', anyDeposits);
// movements:  (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// includes? true
// anyDeposits:  true

//todo: every only returns true if all elements satisfy the condition
console.log('moves: ', movements.every(mov => mov > 0));        // false
console.log('acc4: ',account4.movements.every(mov => mov > 0)); // true
// moves:  false
// acc4:  true

//TODO: separate callback
const deposit = mov => mov > 0;
console.log('moves with callback: ', movements.some(deposit));
console.log('moves-every: ', movements.every(deposit));
console.log('moves-filter: ', movements.filter(deposit));
// moves with callback:  true
// moves-every:  false
// moves-filter:  (5) [200, 450, 3000, 70, 1300]

// todo: flat and flatMap
const arrTest = [[1,2,3], [4,5,6], 7,8];

//! no callback fn, only 1 levels deep
console.log('array flat: ', arrTest.flat());  
// array flat:  (8) [1, 2, 3, 4, 5, 6, 7, 8]

//? more nested array
const arrTest2 = [[[1,2],3], [4,[5,6]], 7,8];
console.log('array more nested: ', arrTest2.flat());  
// array more nested:  (6) [Array(2), 3, 4, Array(2), 7, 8]

//
console.log('array more nested: ', arrTest2.flat(2)); 
// array more nested:  (8) [1, 2, 3, 4, 5, 6, 7, 8] 

//TODO: all movements to 1 array
// a)
const accountMovements = accounts.map(acc => acc.movements);
console.log('accountMovements: ', accountMovements);
// accountMovements:  (4) [Array(8), Array(8), Array(8), Array(5)]

// b)
const allMovements = accountMovements.flat();
console.log('allMovements: ', allMovements);
// allMovements:  (29) [200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, -1000, 8500, -30, 200, -200, 340, -300, -20, 50, 400, -460, 430, 1000, 700, 50, 90]

// c)
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log('overallBalance: ', overallBalance);
// overallBalance:  17840

//todo: chaining
const overallBalanceChained = accounts
              .map(acc => acc.movements)
              .flat()
              .reduce((acc, mov) => acc + mov, 0);
console.log('overallBalanceChained: ', overallBalanceChained);
// overallBalanceChained:  17840

//todo: flatMap goes only 1 level deep and we cannot change it, use flat for more than 1 level
const overallBalanceFlatMap = accounts
              .flatMap(acc => acc.movements)              
              .reduce((acc, mov) => acc + mov, 0);
console.log('overallBalanceFlatMap: ', overallBalanceFlatMap);
// overallBalanceFlatMap:  17840

// TODO: sorting arrays
// STRING
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log('owners sorted: ', owners.sort()); // ! mutates original
console.log('owners: ', owners); // ! mutated
// owners sorted:  (4) ['Adam', 'Jonas', 'Martha', 'Zach']
//        owners:  (4) ['Adam', 'Jonas', 'Martha', 'Zach']

// NUMBERS
console.log('movements: ', movements);
// console.log('movements sorted: ', movements.sort());
//        movements:  (8) [200, 450, -400, 3000, -650, -130, 70, 1300]
// movements sorted:  (8) [-130, -400, -650, 1300, 200, 3000, 450, 70]

//! sort() does sorting based on STRINGS by default
// it converts to string and sorts

// todo: sort with callback fn

//if we return smth less than zero, than A will be before B
//if we return smth greater than zero, than B will be before A
//! return < 0, A, B (keep order)
//! return > 0, B, A (switch order)
// movements.sort((current_value, next_value) 

//todo: sort from small to large - ascending - по возрастанию
// movements.sort((a, b) => {
//   if ( a > b ) return 1;
//   if ( b > a ) return -1;
// });

movements.sort((a, b) => a - b);  //! return positive number

console.log('movements sorted: ', movements);
// as simply being two consecutive numbers in the array
// как просто два последовательных числа в массиве

// sort our movements array now in ascending order : from small to large.
// теперь отсортируйте наш массив движений в порядке возрастания.

//* movements sorted:  (8) [-650, -400, -130, 70, 200, 450, 1300, 3000]

//todo: sort from large to small - descending - нисходящий
// movements.sort((a, b) => {
//   if ( a > b ) return -1;
//   if ( b > a ) return 1;
// });

movements.sort((a, b) => b - a); //! return negative number

console.log('movements sorted: ', movements);
//* movements sorted:  (8) [3000, 1300, 450, 200, 70, -130, -400, -650]

// TODO: more ways of creating and filling arrays
const x = new Array(7);
console.log('x: ', x);
//! it creates a new array with 7 empty elements
// x:  (7) [empty × 7]

// console.log( x.map(() => 5) ); 
// (7) [empty × 7] -- nothing happened

//todo: fill - mutate
// x.fill(1);
// console.log('x: ', x);
// x:  (7) [1, 1, 1, 1, 1, 1, 1]

// x.fill(1, 3);
// console.log('x: ', x);
// x:  (7) [empty × 3, 1, 1, 1, 1]

x.fill(1, 3, 5);
console.log('x: ', x);
// x:  (7) [empty × 3, 1, 1, empty × 2]

const arrFill = [1,2,3,4,5,6,7];
arrFill.fill(34, 4, 6);
console.log('arrFill: ', arrFill);
// arrFill:  (7) [1, 2, 3, 4, 34, 34, 7]

//todo: Array.from
const y = Array.from({length: 7}, () => 1);
console.log('y: ', y );
// y:  (7) [1, 1, 1, 1, 1, 1, 1]

// 
const z = Array.from({length: 7}, (cur, i) => i+1);
const z_ = Array.from({length: 7}, (_, i) => i+1); // we don't use cur parameter
console.log('z: ', z);
// z:  (7) [1, 2, 3, 4, 5, 6, 7]

//
// querySelectorAll - NodeList
// NodeList - convert to - Array

labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'), 
    elem => Number(elem.textContent.replace('€', ''))  // function
  )
  
  console.log('movementsUI: ', movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
})
// (8) ['1300', '70', '-130', '-650', '3000', '-400', '450', '200']
// Number
// (8) [1300, 70, -130, -650, 3000, -400, 450, 200]


// TODO: array methods practice

//todo: 1
// const bankDepositSum = accounts.map(acc => acc.movements).flat();
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, curr) => sum + curr, 0);

console.log('bankDepositSum: ',bankDepositSum );
// bankDepositSum:  25180

//todo: 2
// const numDeposits1000 = accounts
//     .flatMap(acc => acc.movements)
//     .filter(mov => mov >= 1000).length   // 6

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  // .reduce((count, curr) => ( curr >= 1000 ? count + 1 : count), 0)   // 6
  .reduce((count, curr) => ( curr >= 1000 ? count++ : count), 0) //! count++ here 0

console.log('numDeposits1000: ', numDeposits1000);
// numDeposits1000:  6

//! ++ example
let a = 10;
console.log('a++: ', a++ );  // returns old value --> 10
console.log('a: ', a );      // 11
// a++:  10
// a:  11

// ! solution is ++a, prefixed ++ operator
let b = 10;
console.log('++b: ', ++b );  // 11
console.log('b: ', b );      // 11
// ++b:  11
// b:  11

//todo: 3, reduce
const sums = accounts
          .flatMap(acc => acc.movements)
          .reduce((sums, curr) => {
            curr > 0 ? sums.deposits += curr : sums.withdrawals += curr;
            return sums;
          }, {deposits: 0, withdrawals: 0})

console.log('sums: ', sums );
// sums:  {deposits: 25180, withdrawals: -7340}

//todo: destructuring
const { deposits1, withdrawals1} = accounts
          .flatMap(acc => acc.movements)
          .reduce((sums, curr) => {
            // curr > 0 ? sums.deposits1 += curr : sums.withdrawals1 += curr;
            sums[curr > 0 ? 'deposits1' : 'withdrawals1'] += curr;
            return sums;
          }, {deposits1: 0, withdrawals1: 0})

console.log('deposits, withdrawals: ', deposits1, withdrawals1 );
// deposits, withdrawals:  25180 -7340

//todo: 4, this is a nice title - CONVERT to - This Is a Nice Title
