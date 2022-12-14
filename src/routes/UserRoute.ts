const router = require('express').Router();
import { PrismaClient } from 'prisma/prisma-client'
import { Response } from 'express'
import { Request } from 'express';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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


// REGISTER DANS L'APP, MARCHE
router.post('/register', async(req: Request, res: Response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        //@ts-ignore
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //SI UN UTILISATEUR A DEJA CETTE ADRESSE EMAIL
        const userExist = await prisma.user.findUnique({
            where:{
                email: req.body.email
            }
        })

        // ON RENVOIE UN MSG D'ERREUR SI EXISTE
        if (userExist) {
            return res.status(400).json({
                    error: 'un utilisateur utilise deja cette adresse email'
            });
        }

        const newUser = await prisma.user.create({
            // @ts-ignore
            data: {
                username: req.body.username,
                roles: [],
                email: req.body.email,
                password: hashedPassword
            }
        })  

        // ON CREER LE TOKEN AUTH
        let token = jwt.sign({
            id: newUser.id.toString()
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '1h'
        });
        return res.status(200).json({
            message: 'utilisateur enregistr?? avec succes',
            user: newUser,
            token: token
        }); 
    }
    catch(error){
        console.log(error)
        res.send(error)
    }
})


// ROUTE LOGIN
router.post('/login', async(req: Request, res: Response) => {
    try{

        // CHECK SI L'UTILISATEUR EST DANS LA BASE DE DONNEE
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });

        // SI NON, ON ENVOIE MSG ERREUR
        if(user == null){
            return res.status(404).json({
                message: "l'utilisateur n'a pas ??t?? trouv??"
            })
        }

        //ON VERIFIE LE MOT DE PASSE AVEC BCRYPT 
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                message: "mot de passe incorrect"
            });
        }

        // ON CREER LE TOKEN POUR LA SESSION 
        let token = jwt.sign({
            id: user.id.toString()
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: '1h'
        });
        return res.status(200).json({
            message: 'vous etes bien connect??',
            user: user,
            token: token
        }); 

    }
    catch(error){
        console.log(error);
        res.status(500).send(error)
    }
})


module.exports = router;