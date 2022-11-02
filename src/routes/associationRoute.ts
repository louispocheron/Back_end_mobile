const router = require('express').Router();
import { PrismaClient } from 'prisma/prisma-client'
import { Response } from 'express'
import { Request } from 'express'

const prisma = new PrismaClient();



// FIND ALL MARCHE
router.get('/associations', async(req: Request, res: Response) => {
    try{
        const allAssociation = await prisma.associations.findMany();
        res.send(allAssociation);
    }
    catch(error){
        res.send(error)
    }
});

// FIND ONE, MARCHE
router.get('/association/:id', async(req: Request, res: Response) => {
    const associationId = parseInt(req.params.id)

    try{
        const oneAssociation = await prisma.associations.findUnique({
            where: {
                id: associationId
            }
        })
        res.send(oneAssociation)
    }
    catch(error){
        res.send(error)
    }
});


// CREER UNE ASSOCIAITON CA MARCHE MANQUE USER_ID 
router.post("/association", async(req: Request, res: Response) => {
    try{
        const postAssociation = await prisma.associations.create({
            // @ts-ignore
            data: {
                name: req.body.name,
                logo: req.body.logo,
                description: req.body.description,
                user_id: req.body.user_id,
                numero_siret: req.body.numero_siret,
                region: req.body.region
            }
        })
        res.send(postAssociation)
    }
    catch(error){
        res.send(error)
    }
})





module.exports = router;
