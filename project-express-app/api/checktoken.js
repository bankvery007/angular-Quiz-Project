var expressFunction = require('express'); //object to call
const router = expressFunction.Router();
const authorization = require('../config/authorize')

router.route('/checktoken')
    .get(authorization, (req, res) => {
        res.status(200).json({message : "true"});
    })

module.exports = router