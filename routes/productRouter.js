const productController = require('../controllers/ProductController.js')

const router = require('express').Router()

router.post('/addProduct', productController.addProduct)

router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)


router.get('/:id', productController.getOneProducts)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProducts)


module.exports = router 