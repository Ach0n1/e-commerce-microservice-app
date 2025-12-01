import express from 'express';
import CommentsModel from '../models/comments';



export class CommentsController {

    getComments = (req: express.Request, res: express.Response) => {
        let itemId = req.body.itemId;
        
        CommentsModel.find({'itemId' : itemId}, (err, comments) => {
            if (err) console.log(err)
            else res.json(comments)
        })
     }
    
    
}