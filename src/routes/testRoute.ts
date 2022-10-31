const router = require('express').Router();


router.get('/test', (req: Request, res: Response) => {
    return res.send({
        status: 200,
        test: "ok"
    })
})

module.exports = router;