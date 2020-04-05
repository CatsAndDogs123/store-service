const express = require('express');
const adminLogic = require('../../Logic/admin');
const router = express.Router();

router.get('/products', adminLogic.getProducts);

router.post('/add-product', adminLogic.postAddProduct);

router.patch('/edit-product/:productId', adminLogic.postEditProduct);

router.delete('/delete-product', adminLogic.postDeleteProduct);

module.exports = router;
