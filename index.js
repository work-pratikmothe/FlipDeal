const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.get('/', (req, resp) => {
  resp.send(`Server is running on port - ${port} `);
});

app.get('/cart-total', (req, resp) => {
  let { newItemPrice, cartTotal } = req.query;
  let item1Price, item2Price, item3Price;
  cartTotal = parseFloat(cartTotal) + parseFloat(newItemPrice);
  resp.send(cartTotal.toString());
});

// http://localhost:3000/membership-discount?cartTotal=3600&isMember=true

app.get('/membership-discount', (req, resp) => {
  let { cartTotal, isMember } = req.query;
  isMember = isMember === 'true';
  if (isMember) {
    cartTotal = parseFloat(cartTotal);
    discount = cartTotal * 0.2;
    cartTotal = cartTotal - discount;
  }
  resp.send(cartTotal.toString());
});

// http://localhost:3000/calculate-tax?cartTotal=3600

function calculateTax(taxFactor, cartTotal) {
  return cartTotal / taxFactor;
}

// http://localhost:3000/calculate-tax?cartTotal=3600
app.get('/calculate-tax', (req, resp) => {
  let { cartTotal } = req.query;
  resp.send(calculateTax((taxFactor = 20), cartTotal).toString());
});

// http://localhost:3000/estimate-delivery?shippingMethod=express&distance=600

app.get('/estimate-delivery', (req, resp) => {
  let { shippingMethod, distance } = req.query;
  distance = parseFloat(distance);
  let days;
  if (shippingMethod === 'express') {
    days = distance / 100;
  } else if (shippingMethod === 'standard') {
    days = distance / 50;
  }
  resp.send(days.toString());
});

// http://localhost:3000/shipping-cost?weight=2&distance=600

app.get('/shipping-cost', (req, resp) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);

  let cost = weight * distance * 0.1;

  resp.send(cost.toString());
});

// http://localhost:3000/loyalty-points?purchaseAmount=3600

app.get('/loyalty-points', (req, resp) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  let loyaltyPoints = purchaseAmount * 2;

  resp.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
