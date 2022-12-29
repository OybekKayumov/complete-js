// exporting module
console.log('exporting module');

const shippingCost = 10;
// const cart = [];

// named and default exports
export const addToCart = function (product, quantity) {
  cart.push({product, quantity});

  console.log(`${quantity} ${product} added to cart `);
}

const totalPrice = 347;
const totalQuantity = 34;

export {totalPrice, totalQuantity as tq}

// TODO: imports are a life connection to exports
export const cart = [];

//todo: blocking code example 3 - await
console.log('start fetching comments');
const comments = await fetch('https://jsonplaceholder.typicode.com/comments');
console.log('end fetching comments');
// see console log
