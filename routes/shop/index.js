const express = require('express');
const shopLogic = require('../../Logic/shop');
const router = express.Router();

router.get('/products', shopLogic.getProducts);

router.get('/products/:productId', shopLogic.getProduct);

router.get('/cart', shopLogic.getCart);

router.post('/cart-post-item', shopLogic.postProductToCart);

router.post('/cart-post-item-reduce', shopLogic.postProductReduceCart);

router.post('/cart-delete-item', shopLogic.postCartDeleteProduct);

router.post('/create-order', shopLogic.postOrder);

router.get('/orders', shopLogic.getOrders);

router.get('/filtered-products', shopLogic.getFilteredProducts);

module.exports = router;
