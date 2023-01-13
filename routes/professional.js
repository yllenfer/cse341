const express = require('express');
const router = express.Router();

const profControl = require("../controllers/professional")

router.get('/', profControl.getPro);

module.exports = router;