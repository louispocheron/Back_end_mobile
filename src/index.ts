import express from 'express'; 
import cors from 'cors';
const app = express();


const UserRoute = require('./routes/UserRoute')


// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api', UserRoute);

app.listen(3000, () => {
    console.log('serveur run sur le port 3000');
})