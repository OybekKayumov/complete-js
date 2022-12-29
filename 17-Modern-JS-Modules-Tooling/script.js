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
