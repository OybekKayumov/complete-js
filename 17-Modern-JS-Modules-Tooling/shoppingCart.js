// exporting module
console.log('exporting module');

const shippingCost = 10;
const cart = [];

// named and default exports
export const addToCart = function (product, quantity) {
  cart.push({product, quantity});

  console.log(`${quantity} ${product} added to cart `);
}

const totalPrice = 347;
const totalQuantity = 34;

export {totalPrice, totalQuantity}
