const router = require('express').Router();
import { PrismaClient } from 'prisma/prisma-client'
import { Response } from 'express'


const prisma = new PrismaClient()



// RECUPERE TOUT LES UTILISATEURS,  MARCHE
router.get('/users', async (req: Request, res: Response) => {
    try{
        const allUsers = await prisma.user.findMany();
        res.send(allUsers);
    }
    catch(error){
        res.send(error)
    }
})


// DELETE UN UTILISATEUR, MARCHE
router.delete('/user/delete/:id', async(req: Request, res: Response) => {
    // @ts-ignore
    const id: number = parseInt(req.params.id)
    try{
        const deleteUser = await prisma.user.delete({
            where:{
                id: id
            }
        });
        res.send(deleteUser);
    }
    catch(error){
        res.send(error);
    }
})

// RECUPERE UN UTILISATEUR, MARCHE
router.get('/user/:id', async(req: Request, res: Response) => {
    // @ts-ignore
    const id: number = parseInt(req.params.id);
    try {
        const findUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        res.send(findUser)
    }
    catch(error){
        res.send(error)
    }
})

module.exports = router;