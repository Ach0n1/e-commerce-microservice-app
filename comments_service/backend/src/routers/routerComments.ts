import express from 'express';
import { CommentsController } from '../controllers/comments.controller';

const routerComments = express.Router();

routerComments.route('/getComments').post(
    (req, res) => new CommentsController().getComments(req,res)
)


export default routerComments;