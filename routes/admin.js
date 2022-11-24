const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product => POST
router.post('/edit-product', adminController.posteditproduct);

// /admin/edit-product => GET
router.get('/edit-product/:productid',adminController.getEditProduct)

// /admin/DELETE-product => GET
router.get('/delete-product/:productid',adminController.deleteproduct)

module.exports = router;
