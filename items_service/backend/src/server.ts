import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routerItems from './routers/routerItems';
import path from 'path';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/images", express.static(path.join("images")));

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/itemsWebShop');

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("db connected")
});

const router = express.Router();
router.use('/items', routerItems);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));