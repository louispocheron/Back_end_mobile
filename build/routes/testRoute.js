"use strict";
const router = require('express').Router();
router.get('/test', (req, res) => {
    return res.send({
        status: 200,
        test: "ok"
    });
});
module.exports = router;
