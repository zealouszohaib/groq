const router = require("express").Router();
const uploadRouter = require('./upload');
const companyRouter = require('./comapnay');

router.use('/upload',uploadRouter);
router.use('/company',companyRouter);


module.exports = router;

