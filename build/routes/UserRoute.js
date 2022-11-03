"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const prisma_client_1 = require("prisma/prisma-client");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new prisma_client_1.PrismaClient();
// RECUPERE TOUT LES UTILISATEURS,  MARCHE
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.user.findMany();
        res.send(allUsers);
    }
    catch (error) {
        res.send(error);
    }
}));
// DELETE UN UTILISATEUR, MARCHE
router.delete('/user/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = parseInt(req.params.id);
    try {
        const deleteUser = yield prisma.user.delete({
            where: {
                id: id
            }
        });
        res.send(deleteUser);
    }
    catch (error) {
        res.send(error);
    }
}));
// RECUPERE UN UTILISATEUR, MARCHE
router.get('/user/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = parseInt(req.params.id);
    try {
        const findUser = yield prisma.user.findUnique({
            where: {
                id: id
            }
        });
        res.send(findUser);
    }
    catch (error) {
        res.send(error);
    }
}));
// REGISTER DANS L'APP, MARCHE
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt.genSalt(10);
        //@ts-ignore
        const hashedPassword = yield bcrypt.hash(req.body.password, salt);
        //SI UN UTILISATEUR A DEJA CETTE ADRESSE EMAIL
        const userExist = yield prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        // ON RENVOIE UN MSG D'ERREUR SI EXISTE
        if (userExist) {
            return res.status(400).json({
                error: 'un utilisateur utilise deja cette adresse email'
            });
        }
        const newUser = yield prisma.user.create({
            // @ts-ignore
            data: {
                username: req.body.username,
                roles: [],
                email: req.body.email,
                password: hashedPassword
            }
        });
        // ON CREER LE TOKEN AUTH
        let token = jwt.sign({
            id: newUser.id.toString()
        }, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        });
        return res.status(200).json({
            message: 'utilisateur enregistré avec succes',
            user: newUser,
            token: token
        });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
}));
// ROUTE LOGIN
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // CHECK SI L'UTILISATEUR EST DANS LA BASE DE DONNEE
        const user = yield prisma.user.findUnique({
            where: {
                email: req.body.email
            }
        });
        // SI NON, ON ENVOIE MSG ERREUR
        if (user == null) {
            return res.status(404).json({
                message: "l'utilisateur n'a pas été trouvé"
            });
        }
        //ON VERIFIE LE MOT DE PASSE AVEC BCRYPT 
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                message: "mot de passe incorrect"
            });
        }
        // ON CREER LE TOKEN POUR LA SESSION 
        let token = jwt.sign({
            id: user.id.toString()
        }, process.env.TOKEN_SECRET, {
            expiresIn: '1h'
        });
        return res.status(200).json({
            message: 'vous etes bien connecté',
            user: user,
            token: token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}));
module.exports = router;
