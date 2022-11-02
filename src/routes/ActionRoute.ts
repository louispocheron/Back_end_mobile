const router = require('express').Router();
import { PrismaClient } from 'prisma/prisma-client'
import { Response } from 'express'
import { Request } from 'express'


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



// A REVOIR CA BEUG 
router.post('/action', async (req: Request, res: Response) => {
    const test = new Date(Date.now())

    try{
        const postAction = await prisma.action.create({
            
            // @ts-ignore
            data: {
                ville_depart: req.body.villeDepart,
                ville_arrive: req.body.villeArrive,
                km: req.body.km,
                raisons: req.body.raisons,
                heure_depart: req.body.heureDepart,
                heure_arrivee: req.body.heureArrivee,
                date: test,
                user_id: req.body.userId,
                association_id: req.body.associationId,
                duree: req.body.duree,
                frais: req.body.frais,
                // @ts-ignore
                // created_at: Date.now(),
                charges: req.body.charges,
                groupe: req.body.groupe,
                dons: req.body.dons,
                heures_valorisees: req.body.valorisees,
                a_payer: req.body.aPayer,
            },
        })
        res.send({
            postAction,
            "bien crée": 200
        });
    }
    catch(error){
        res.send(error)
    }
})

module.exports = router