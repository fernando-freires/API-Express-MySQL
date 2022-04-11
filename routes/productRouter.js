// importing controllers products and review
const productController = require('../controllers/ProductController.js')
const reviewController = require('../controllers/ReviewController')

// router
const router = require('express').Router()

// use routers
router.post('/addProduct', productController.addProduct)

router.get('/allProducts', productController.getAllProducts)

router.get('/published', productController.getPublishedProduct)


// Review url and controller
router.post('/addReview/:id', reviewController.addReview)
router.get('/allReviews', reviewController.getAllReviews)

// get product reviews
router.get('/getProductReviews/:id', productController.getProductsReviews)


router.get('/:id', productController.getOneProducts)

router.put('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProducts)


module.exports = router 