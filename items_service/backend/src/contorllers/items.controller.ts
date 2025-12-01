import express from 'express';
import ItemsModel from '../models/items';

export class ItemsController {

 getAllItems = (req: express.Request, res: express.Response) => {
    ItemsModel.find({}, (err, items) => {
        if (err) console.log(err)
        else res.json(items)
    })
 }

 getCategories = (req: express.Request, res: express.Response) => {
    let categories = [];

    ItemsModel.distinct("category", (err, fechedCategories) => {
        if (err) console.log(err)
        else {
            // loop through array, replacing _ with blank character and making first letter uppercase letter
            for (let category of fechedCategories) {
                category = category.replace('_', ' ');
                let firstLetter = category.charAt(0).toUpperCase();
                let remainingLetters = category.slice(1);
                categories.push(firstLetter + remainingLetters);
            }
            res.json(categories)
        } 
    })
 }

 getItemsByCategory = (req: express.Request, res: express.Response) => {
    let categoryParam = req.body.categoryParam;
    categoryParam = categoryParam.replace(' ', '_');
    categoryParam = categoryParam.toLowerCase();

    
    ItemsModel.find({category: new RegExp(categoryParam, 'i')}, (err, items) => {
        if (err) console.log(err)
        else res.json(items)
    })
 }

 getItemsBySearchParam = (req: express.Request, res: express.Response) => {
    let searchParam = req.body.searchParam;
    ItemsModel.find({ $text: { $search: searchParam } }, (err, items) => {
        if (err) console.log(err)
        else {
            res.json(items);
        }
    })
 }

 getDiscountedProducts = (req: express.Request, res: express.Response) => {
    ItemsModel.find({ onSale: true }, (err, items) => {
        if (err) console.log(err)
        else {
            res.json(items);
        }
    })
 }

}