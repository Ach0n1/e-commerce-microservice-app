import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routerComments from './routers/routerComments';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/commentsWebShop');
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("db connected")
});

const router = express.Router();
router.use('/comments', routerComments);

app.use('/', router);
app.listen(8000, () => console.log(`Express server running on port 8000`));