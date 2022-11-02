const router = require('express').Router();
import { PrismaClient } from 'prisma/prisma-client'
import { Response } from 'express'


const prisma = new PrismaClient()

// GET ALL ACTIONS, MARCHE
router.get('/actions', async(req: Request, res: Response) => {
    try{
        const allActions = await prisma.action.findMany();
        res.send(allActions);
    }
    catch(error){
        res.send(error)
    }
})




// GET ALL ACTIONS D'UN USER, MARCHE
router.get('/actions/:userId', async(req: Request, res: Response) => {
    //@ts-ignore
    const userId: number = parseInt(req.params.userId)
    try{
        const userAction = await prisma.action.findMany({
            where: {
                user_id: userId
            }
        })
        res.send(userAction);
    }
    catch(error){
        res.send(error)
    }
})


// GET ACTION FROM ID, MARCHE
router.get('/action/:id', async(req: Request, res: Response) => {
    //@ts-ignore
    const id: number = parseInt(req.params.id)
    try{
        const UniqueAction = await prisma.action.findUnique({
            where: {
                id: id
            }
        })
        res.send(UniqueAction);
    }
    catch(error){
        res.send(error)
    }
})

module.exports = router