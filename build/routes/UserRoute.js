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
// RECUPERE TOUT LES UTILISATEURS,  MARCHE
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield prisma.user.findMany();
        //@ts-ignore
        res.send(allUsers);
    }
    catch (error) {
        //@ts-ignore
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
        // @ts-ignore
        res.send(deleteUser);
    }
    catch (error) {
        // @ts-ignore
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
        // @ts-ignore
        res.send(findUser);
    }
    catch (error) {
        // @ts-ignore
        res.send(error);
    }
}));
module.exports = router;
