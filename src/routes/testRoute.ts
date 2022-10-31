const router = require('express').Router();


router.get('/test', (req: Request, res: Response) => {
    //@ts-ignore
    return res.send({
        status: 200,
        test: "ok"
    })
})

module.exports = router;