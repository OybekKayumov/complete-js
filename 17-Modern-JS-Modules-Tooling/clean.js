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

const getLimit = user => spendingLimits?.[user] ?? 0;

const addExpense = function (state, limits, value, description, user = 'jonas') {
  const cleanUser = user.toLowerCase();

  if (value <= getLimit(cleanUser)) {
    return [...state, { value: -value, description, user: cleanUser }]
  }
};

const newBudget1 = addExpense(budget, spendingLimits, 10, 'Pizza 🍕');
console.log('newBudget1: ', newBudget1);

addExpense(budget, spendingLimits, 100, 'Going to movies 🍿', 'Matilda');
addExpense(budget, spendingLimits, 200, 'Stuff', 'Jay');
// console.log(budget);

const checkExpenses = function () {
  for (const entry of budget)
    if (entry.value < -getLimit(entry.user)) entry.flag = 'limit';
};
checkExpenses();

console.log(budget);

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
