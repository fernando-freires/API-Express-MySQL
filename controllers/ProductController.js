const db = require('../models/')

// create main Model
const Product = db.products
const Review = db.reviews

// image upload
const multer = require('multer')
const path = require('path')

// main work

// 1 - create product
const addProduct = async (req, res) => {
    let info = {
        image: req.file.path,
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info)

    res.status(200).send(product)
}

// 2 - get all products
const getAllProducts = async (req, res) => {
    let products = await Product.findAll({})

    res.status(200).send(products)
}

// 3 - get single product
const getOneProducts = async (req, res) => {
    let id = req.params.id

    let product = await Product.findOne({ where: {id: id} })

    res.status(200).send(product)
}

// 4 - update product
const updateProduct = async (req, res) => {
    let id = req.params.id

    const product = await Product.update(req.body, {where: {id: id}})

    res.status(200).send(product)
}

// 5 - delete product by id
const deleteProducts = async (req, res) => {
    let id = req.params.id

    await Product.destroy({where: {id: id}})

    res.status(200).send('Product is deleted')
}

// 6 - get published product
const getPublishedProduct = async (req, res) => {

    const products = await Product.findAll({ where: {published: true} })

    res.status(200).send(products)
}

// 7 - connect one to many relation Product and Reviews
const getProductsReviews = async (req, res) => {
    const id = req.params.id

    const data = await Product.findOne({
        include: [{
            model: Review,
            as: 'review'
        }],
        where: { id: id }
    })

    res.status(200).send(data)
}

// 8 - images uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '5000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')


module.exports = {
    addProduct,
    getAllProducts,
    getOneProducts,
    updateProduct,
    deleteProducts,
    getPublishedProduct,
    getProductsReviews,
    upload
}