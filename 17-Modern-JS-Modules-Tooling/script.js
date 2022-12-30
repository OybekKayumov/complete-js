// parsing means to read code without executing it
// this is the moment in which imports are hoisted

// import './app.js'

//todo: importing module
// import './shoppingCart.js';
// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// addToCart('bread', 5);
// console.log(totalPrice, totalQuantity );
// console.log(price, tq );

// console.log('importing module ');
//! exporting module
//! importing module 

/*
import * as ShoppingCart from './shoppingCart.js';
// look similar as Object
ShoppingCart.addToCart('bread', 5)

// TODO: imports are a life connection to exports
// export const cart = [];
ShoppingCart.addToCart('pizza', 2)
ShoppingCart.addToCart('bread', 5)
ShoppingCart.addToCart('apples', 4)

console.log('ShoppingCart.cart: ', ShoppingCart.cart);
// ShoppingCart.cart:  (4) [{…}, {…}, {…}, {…}]
//! not empty array, we are mutating array.
//! IMPORTS ARE NOT COPIES OF EXPORT, 
// they are instead like a live connection, 
// and it means that they point the same place in the memory 

// TODO: Top-Level await (ES2022)
//! THIS BLOCKS THE EXECUTION OF THE ENTIRE MODULE NOW
/*
console.log('Start fetching posts: ');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log('data: ', data);          // data 100
console.log('End fetching posts: ');
*/
//! before we would have to write async fn:
//! async function x() {}

//* EXECUTION
// Start fetching posts:      1
// data:  (100) [{…}, {…},    2
// End fetching posts:        3

//* EXECUTION 2
/*
const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log('data: ', data);

  return { title: data.at(-1).title, text: data.at(-1).body}
}

const lastPost = getLastPost();
console.log('lastPost: ', lastPost);  // Promise(pending) 

// not very clean
// lastPost.then(last => console.log(last))

const lastPost2 = await lastPost  // getLastPost() 
console.log(': ', lastPost2);
// {title: 'at nam consequatur ea labore ea harum', text: 'cupiditate quo est a modi nesciunt soluta\nipsa vol…nam et distinctio eum\naccusamus ratione error aut'}

*/

// TODO: The Module Pattern
/*
//IIFE function is only created once and only called once
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;

  const totalPrice = 347;
  const totalQuantity = 34;

  const addToCart = function (product, quantity) {
    cart.push({product, quantity});
  
    console.log(`${quantity} ${product} added to cart `);
  }

  const orderStock = function (product, quantity) {
    cart.push({product, quantity});
  
    console.log(`${quantity} ${product} ordered fro supplier`);
  }

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})()

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log('ShoppingCart2: ', ShoppingCart2 );
console.log('ShoppingCart2: ', ShoppingCart2.shippingCost ); //! undefined

//! closures
*/

// TODO: CommonJS Modules
/*
// export
export.addToCart = function (product, quantity) {
  cart.push({product, quantity});

  console.log(`${quantity} ${product} added to cart `);
}

// import
const { addToCart} = require('./shoppingCart.js');
*/

// import add, {cart} from './shoppingCart.js';
// add('pizza', 2)
// add('bread', 5)
// add('apples', 4)

// TODO: A Brief Introduction to the Command Line
// TODO: Introduction to NPM
// import cloneDeep from '../node_modules/lodash-es/cloneDeep.js';
import cloneDeep from 'lodash-es';
// import cloneDeep from 'lodash';

//deeply nested object
const state = {
  cart: [
    {product: 'bread', quantity: 5},
    {product: 'pizza', quantity: 5},
  ],
  user: {loggedIn: true}
};

// create a copy an object with Object.assign
const stateClone = Object.assign({}, state); 

const stateDeepClone = cloneDeep(state);  //! using lodash to copy object

state.user.loggedIn = false;
console.log('stateClone: ', stateClone ); 
//! copy also false
//* user: 
//* loggedIn: false

//todo: using lodash to copy object --> true
// const stateDeepClone = cloneDeep(state); 
console.log('lodash stateDeepClone: ', stateDeepClone);
//! user: 
//! loggedIn: true

// install all dependencies
// npm install / npm i

// TODO: Bundling With Parcel and NPM Scripts
if (module.hot) {
  module.hot.accept();
}

// TODO: Configuring Babel and Polyfilling
class Person {
  greeting = 'Hey'
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}

const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

import 'core-js/stable';

// Polifilling async functions
import 'regenerator-runtime/runtime';

// TODO: Review: Writing Clean and Modern JavaScript
// TODO: Let's Fix Some Bad Code: Part 1
