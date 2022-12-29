// parsing means to read code without executing it
// this is the moment in which imports are hoisted

//todo: importing module
// import './shoppingCart.js';
// import { addToCart, totalPrice as price, tq } from "./shoppingCart.js";
// addToCart('bread', 5);
// console.log(totalPrice, totalQuantity );
// console.log(price, tq );

console.log('importing module ');
//! exporting module
//! importing module 

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
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
console.log('data: ', data);
// data 100

