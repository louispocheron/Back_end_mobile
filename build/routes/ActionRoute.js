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
// GET ALL ACTIONS, MARCHE
router.get('/actions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allActions = yield prisma.action.findMany();
        res.send(allActions);
    }
    catch (error) {
        res.send(error);
    }
}));
// GET ALL ACTIONS D'UN USER, MARCHE
router.get('/actions/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = parseInt(req.params.userId);
    try {
        const userAction = yield prisma.action.findMany({
            where: {
                user_id: userId
            }
        });
        res.send(userAction);
    }
    catch (error) {
        res.send(error);
    }
}));
// GET ACTION FROM ID, MARCHE
router.get('/action/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = parseInt(req.params.id);
    try {
        const UniqueAction = yield prisma.action.findUnique({
            where: {
                id: id
            }
        });
        res.send(UniqueAction);
    }
    catch (error) {
        res.send(error);
    }
}));
module.exports = router;
