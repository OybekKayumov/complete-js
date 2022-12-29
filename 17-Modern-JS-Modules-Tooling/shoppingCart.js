// exporting module
console.log('exporting module');

const shippingCost = 10;
const cart = [];

// named and default exports
const addToCart = function (product, quantity) {
  cart.push({product, quantity});

  console.log(`${quantity} ${product} added to cart `);
}

