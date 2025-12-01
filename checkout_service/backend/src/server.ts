import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routerBills from './routers/routerBills';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/billsWebShop');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("db connected")
});

const router = express.Router();
router.use('/checkout', routerBills);

app.use('/', router);
app.listen(9000, () => console.log(`Express server running on port 9000`));