const express = require('express')
const router = express.Router()
const user = require('../controllers/user')

router.get('/authorization', user.authorization)
router.post('/login', user.login)

module.exports = router
