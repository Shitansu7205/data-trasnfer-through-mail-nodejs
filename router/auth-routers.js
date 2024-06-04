const express = require('express')

const {home , getData} = require('../controller/auth-controllers')
const router = express.Router()


router.route('/').get(home)
router.route('/').post(getData)




module.exports = router