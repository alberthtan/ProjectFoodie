const router = require('express').Router();

const { createMenu } = require("../controllers/menu");

router.post('/create', createMenu);

module.exports = router;
