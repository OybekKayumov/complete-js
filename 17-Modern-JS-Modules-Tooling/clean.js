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

// const getLimit = user => spendingLimits?.[user] ?? 0;
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

// console.log('newBudget1: ', newBudget1);
// console.log('newBudget2: ', newBudget2);
// console.log('newBudget3: ', newBudget3);
/*
const checkExpenses = function (state, limits) {
  // for (const entry of budget)
  //   if (entry.value < -getLimit(limits, entry.user)) entry.flag = 'limit';
  // create new array
  return state.map(entry => {
    return entry.value < -getLimit(limits, entry.user)
          ? {...entry, flag : 'limit'}
          : entry;
  })
};
*/
const checkExpenses = (state, limits) => 
  state.map(entry => 
    entry.value < -getLimit(limits, entry.user)
      ? {...entry, flag : 'limit'}
      : entry
  );

const finalBudget = checkExpenses(newBudget3, spendingLimits);
console.log('finalBudget', finalBudget);

const logBigExpenses = function (bigLimit) {
  let output = '';
  for (const entry of budget) 
    output += 
      entry.value <= -bigLimit 
        ? `${entry.description.slice(-2)} / `
        : '';
     // Emojis are 2 chars
  
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};

logBigExpenses(1000);
console.log(budget);

// TODO: Declarative and Functional JavaScript Principles
// imperative -  HOW to do things
// declarative - WHAT to do
    // functional programming
    // side effect - mutation data
    // pure function - function without side effects
    // immutability - data(state) is NEVER modified, instead state(data) is copied and the copy is mutated and returned
