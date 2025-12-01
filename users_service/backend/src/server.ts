import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routerUsers from './routers/routerUsers';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/usersWebShop');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("db connected")
});

const router = express.Router();
router.use('/users', routerUsers);

app.use('/', router);
app.listen(5000, () => console.log(`Express server running on port 5000`));