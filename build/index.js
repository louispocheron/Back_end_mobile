"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const UserRoute = require('./routes/UserRoute');
const ActionRoute = require('./routes/ActionRoute');
const AssociationRoute = require('./routes/associationRoute');
// MIDDLEWARE
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ROUTES
app.use('/api', UserRoute);
app.use('/api', ActionRoute);
app.use('/api', AssociationRoute);
app.listen(3000, () => {
    console.log('serveur run sur le port 3000');
});
