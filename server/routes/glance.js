const express = require('express')
const glance = express.Router()
const images = require('../controllers/glance/images')

glance.get('/getImageById', images.getImageById)
glance.get('/getImages', images.getImages)

module.exports = glance
