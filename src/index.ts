import express from 'express';
import cors from 'cors';
const app = express();


const UserRoute = require('./routes/UserRoute');
const ActionRoute = require('./routes/ActionRoute');


// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api', UserRoute);
app.use('/api', ActionRoute);


app.listen(3000, () => {
    console.log('serveur run sur le port 3000');
})