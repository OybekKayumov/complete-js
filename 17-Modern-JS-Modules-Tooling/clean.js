'strict mode';

const budget = Object.freeze([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});

const getLimit = (limits,user) => limits?.[user] ?? 0;

//todo: PURE FUNCTION
const addExpense = function (state, limits, value, description, user = 'jonas') {
  const cleanUser = user.toLowerCase();

  return value <= getLimit(limits, cleanUser) 
    ? [...state, { value: -value, description, user: cleanUser }]
    : state;
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');

const newBudget2 = addExpense(
  newBudget1,   //  budget, 
  spendingLimits, 
  100, 'Going to movies 🍿', 'Matilda');

const newBudget3 = addExpense(
  newBudget2, 
  spendingLimits, 
  200, 'Stuff', 'Jay');

const checkExpenses = (state, limits) => 
  state.map(entry => 
    entry.value < -getLimit(limits, entry.user)
      ? {...entry, flag : 'limit'}
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log('finalBudget', finalBudget);

// impure function
const logBigExpenses = function (state, bigLimit) {

  //todo: functional version
  const bigExpenses = state
    .filter(entry => entry.value <= -bigLimit )
    .map(entry => entry.description.slice(-2))
    .join(' / ')
    // .reduce((str, curr) => `${str} ${curr.description.slice(-2)}`, '')

  console.log('bigExpenses: ', bigExpenses);
};

logBigExpenses(finalBudget, 1000);

// TODO: Declarative and Functional JavaScript Principles
// imperative -  HOW to do things
// declarative - WHAT to do
    // functional programming
    // side effect - mutation data
    // pure function - function without side effects
    // immutability - data(state) is NEVER modified, instead state(data) is copied and the copy is mutated and returned
