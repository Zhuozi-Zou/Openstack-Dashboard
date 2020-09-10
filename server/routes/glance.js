const express = require('express')
const glance = express.Router()
const images = require('../controllers/glance/images')

glance.get('/getImageById', images.getImageById)
glance.get('/getImages', images.getImages)
glance.delete('/deleteImage', images.deleteImage)

module.exports = glance
