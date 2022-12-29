// parsing means to read code without executing it
// this is the moment in which imports are hoisted

//todo: importing module
// import './shoppingCart.js';
import { addToCart } from "./shoppingCart.js";


console.log('importing module ');

//! exporting module
//! importing module 

addToCart('bread', 5)
