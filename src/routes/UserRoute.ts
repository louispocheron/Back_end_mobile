const router = require('express').Router();
import { PrismaClient } from 'prisma/prisma-client'

const prisma = new PrismaClient()



// RECUPERE TOUT LES UTILISATEURS,  MARCHE
router.get('/users', async (req: Request, res: Response) => {
    try{
        const allUsers = await prisma.user.findMany();
        //@ts-ignore
        res.send(allUsers);
    }
    catch(error){
        //@ts-ignore
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
        // @ts-ignore
        res.send(deleteUser);
    }
    catch(error){
        // @ts-ignore
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
        // @ts-ignore
        res.send(findUser)
    }
    catch(error){
        // @ts-ignore
        res.send(error)
    }
})

module.exports = router;