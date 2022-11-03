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
const prisma = new prisma_client_1.PrismaClient();
// FIND ALL MARCHE
router.get('/associations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAssociation = yield prisma.associations.findMany();
        res.send(allAssociation);
    }
    catch (error) {
        res.send(error);
    }
}));
// FIND ONE, MARCHE
router.get('/association/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const associationId = parseInt(req.params.id);
    try {
        const oneAssociation = yield prisma.associations.findUnique({
            where: {
                id: associationId
            }
        });
        res.send(oneAssociation);
    }
    catch (error) {
        res.send(error);
    }
}));
// CREER UNE ASSOCIAITON CA MARCHE MANQUE USER_ID 
router.post("/association", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    console.log(req.body);
    try {
        const postAssociation = yield prisma.associations.create({
            // @ts-ignore
            data: {
                name: req.body.name,
                logo: req.body.logo,
                description: req.body.description,
                user_id: req.body.user_id,
                numero_siret: req.body.numero_siret,
                region: req.body.region
            }
        });
        res.send(postAssociation);
    }
    catch (error) {
        res.send(error);
    }
}));
module.exports = router;
