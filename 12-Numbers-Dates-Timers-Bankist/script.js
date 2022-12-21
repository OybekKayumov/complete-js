'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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
// Functions

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i])

    const day = `${date.getDate()}`.padStart(2, 0); // to get day like 02
    const month = `${date.getMonth() + 1}`.padStart(2, 0);  // (+1) for 0 based
    const year = date.getFullYear();

    const displayDate = `${day}/${month}/${year}`;

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}€</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

// always logged in - fake
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    // labelDate.textContent = now;
    const day = `${now.getDate()}`.padStart(2, 0); // to get day like 02
    const month = `${now.getMonth() + 1}`.padStart(2, 0);  // (+1) for 0 based
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    labelDate.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`;
    //* day/month/year

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer Date

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  // const amount = +inputLoanAmount.value;
  const amount = Math.floor(inputLoanAmount.value);  // type coercion to number

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  // displayMovements(currentAccount.acc.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
//TODO: converting and checking Numbers

// Number in JS are floating point numbers, always as decimals
console.log(23 === 23.0 ); //* true

// base 10 - 0 to 9, 1/10 = 0.1
// binary base 2 - 0 and 1

// one example of that is the fraction 0.1
// одним из примеров этого является дробь 0,1
console.log(0.1 + 0.2 );
//! 0.30000000000000004

// 3/10 = 3.33333
console.log(0.1 + 0.2 === 0.3);  //! false

//todo: Convert String to Numbers
console.log(Number('34'));
console.log(+'34'); // type coercion - принуждение типа auto convert to Numbers

// Parsing - read number from string
console.log(Number.parseInt('30px')); // 30, number, not a string
console.log(Number.parseInt('px30')); //! NaN

// regex
console.log(Number.parseInt('30px', 2)); // 
console.log(Number.parseInt('30px', 10)); // 30

// parseFloat - read decimal numbers from string
console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseInt('2.5rem'));   //! 2, only integer part

// parseInt and parseFloat are global fns
console.log(parseFloat('4.5em'));  // 4.5

// isNaN - check if value is NaN not a number
console.log(Number.isNaN(34) ); // false
console.log(Number.isNaN('34') ); // false

console.log(Number.isNaN('34x') ); // false
console.log(Number.isNaN(+'34x') ); // true

console.log(Number.isNaN(20 / 0) ); //! false (Infinity 23 / 0)

// checking if value is number, not string
console.log(Number.isFinite(20) );  // true
console.log(Number.isFinite('20') );  // false

console.log(Number.isFinite(20 / 0) );  //! false

// isInteger
console.log(Number.isInteger(34));      // true
console.log(Number.isInteger(34.0));    // true
console.log(Number.isInteger(34 / 0));  // false

//TODO: Math and Rounding
console.log(Math.sqrt(25));   // 5
console.log(25 ** (1/2) );    // 5
console.log(8 ** (1/3) );     // 2

console.log(Math.max(5,18,34,11,2));   // 34
console.log(Math.max(5,18,'34',11,2)); // 34
console.log(Math.max(5,18,'34px',11,2)); // NAN

console.log(Math.min(5,18,34,11,2));     // 2

console.log(Math.PI); // 3.141592

// area of circle with radius 10
console.log(Math.PI * Number.parseFloat('10px') ** 2); // 314.1592

// Math.trunk removes any decimal parts
console.log(Math.trunc(Math.random() * 6 ) + 1);  // between 1 - 6

// get number between min and max
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min;
// 0 ...1 -> 0...(max - min) -> min..max
console.log('randomInt: ', randomInt(10, 20));

//todo: Rounding integers
console.log(Math.trunc(24.5));  // 24
console.log(Math.round(24.5));  // 24

// ceil - round up
console.log('ceil:',  Math.ceil(24.3));  // 25

// floor - round down
console.log(Math.floor(24.5));  // 24
console.log(Math.floor('36.1'));  //! 36

//! Negative numbers
console.log(Math.floor(-24.5));  //! -25
console.log(Math.trunc(-24.5));  //! -24

// Rounding decimals
console.log((2.7).toFixed(0));  //! returns '3' string
console.log((2.7).toFixed(3));  // 2.700 , string
console.log((2.8935).toFixed(2));  // 2.89 , string
console.log(+(2.8935).toFixed(2));  // 2.89 , number


// TODO: The Remainder Operator
// return the remainder of a division 
// возвращает остаток от деления

console.log(5 % 2 );  // 1 ==> 5 = 2 * 2 + 1

//todo: even and odd
console.log(16 % 2 );  // 0
console.log(17 % 2 );  // 1

const isEven = n => n % 2 === 0;

console.log(isEven(0));  // true
console.log(isEven(8));  // true
console.log(isEven(45)); // false

// new array
labelBalance.addEventListener('click', () => {
  
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    // 0, 2, 4...
    if (i % 2 === 0 ) row.style.backgroundColor = 'orangered';
    
    // 0, 3, 6...
    if (i % 3 === 0 ) row.style.backgroundColor = 'blue';
  });
});

//TODO: Numeric Separators
// 287,460,000,000
const diameter = 28746000000;
console.log('diameter: ', diameter );

const price = 345_99

const transferFee = 15_00
const transferFee2 = 1_500
const PI = 3.14_15         // OK
// const PI1 = 3._1415    // !Uncaught SyntaxError: Invalid or unexpected token
// const PI2 = 3_.1415 // !Uncaught SyntaxError: Numeric separators are not allowed at the end of numeric literals
// const PI2 = _3.1415_ // !Error
// const PI2 = 3.14__15 // !Error

console.log(Number('340_000') ); // !NaN
console.log(parseInt('340_000') ); // !340

console.log('diameter: ', diameter );

//TODO:Working with BigInt
console.log('biggest number : ', 2 ** 53 - 1);
// biggest number :  9007199254740991
console.log('biggest number : ', 2 ** 53 + 10);
console.log('biggest number : ', 2 ** 53 + 11);
// biggest number :  9007199254741002   //! presentation is not correct after biggest
// biggest number :  9007199254741004   //!

console.log('Number.MAX_SAFE_INTEGER: ', Number.MAX_SAFE_INTEGER);
// Number.MAX_SAFE_INTEGER:  9007199254740991

//* BigInt
console.log(483845678954564562131456647879);
// 4.838456789545646e+29
console.log(483845678954564562131456647879n);  //! n
// 483845678954564562131456647879n
console.log(BigInt(483845678954564562131456647879));  //! not same
// 483845678954564582936303108096n

//todo: Operations
console.log(10000n + 20000n);
console.log(45654646546489794556456n * 1000000n );
// 30000n
//45654646546489794556456000000n

//! NOT mix BigInt and other types
const huge = 20645646789794564612313n;
const num = 34;
// console.log(huge * num ); //! Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions

console.log(huge * BigInt(num) ); 

//! Uncaught TypeError: Cannot convert a BigInt value to a number at Math.sqrt (<anonymous>)
// console.log(Math.sqrt(16n) ); 

//todo: Exceptions
console.log(20n > 15 ); // true

console.log(20n === 20 ); // false, we try bigInt === regularNumber
console.log(typeof 20n ); // bigint
console.log(20n == 20 );  //! true, type coercion, 20n as a regularNumber
console.log(20n == '20' ); //! true

console.log(huge + ' is REALLY big!!!' ); 
//! 20645646789794564612313 is REALLY big!!!
// number converted to the String

//todo: Divisions
console.log(10n / 3n ); // 3n  returns nearest bigint, cut off the decimal part
console.log(10 / 3 );   // 3.3333333333333335


//TODO: Creating Dates
/*
// create date - 4 ways
const now = new Date();
console.log('now: ', now );

console.log(new Date() );
console.log(new Date('December 21, 2015'));

console.log(new Date(account1.movementsDates[0]));
// Tue Nov 19 2019

console.log(new Date(2037, 10, 19, 15, 34, 5 ));
// Thu Nov 19 2037 15:34:05

console.log(new Date(0) ); // unix time
// Thu Jan 01 1970 06:00:00
*/
//todo: working with Dates
const future = new Date(2037, 10, 19, 15, 34);
console.log(future.getFullYear());  // 2037
console.log(future.getYear());  //! 137. never use
console.log(future.getMonth());  // 10
console.log(future.getDate());   // 19
console.log(future.getDay());    //day of the week 4 Thursday
console.log(future.getHours());    
console.log(future.getMinutes());  
console.log(future.getSeconds());  

console.log(future.toISOString()); // 2037-11-19T10:34:00.000Z

// timestamp
console.log(future.getTime()); // 2142239640000 milliseconds

console.log(new Date(2142239640000));  //! Thu Nov 19 2037 15:34:00

console.log(Date.now());

future.setFullYear(2040);
console.log(future);      // Mon Nov 19 2040 15:34:00 