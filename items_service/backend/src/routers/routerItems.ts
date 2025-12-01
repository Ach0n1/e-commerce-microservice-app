import express from 'express';
import { ItemsController } from '../contorllers/items.controller';

const routerItems = express.Router();

routerItems.route('/getAllItems').get(
    (req, res) => new ItemsController().getAllItems(req,res)
)

routerItems.route('/getCategories').get(
    (req, res) => new ItemsController().getCategories(req,res)
)

routerItems.route('/getItemsByCategory').post(
    (req, res) => new ItemsController().getItemsByCategory(req,res)
)

routerItems.route('/getItemsBySearchParam').post(
    (req, res) => new ItemsController().getItemsBySearchParam(req,res)
)

routerItems.route('/getDiscountedProducts').get(
    (req, res) => new ItemsController().getDiscountedProducts(req,res)
)

export default routerItems;
