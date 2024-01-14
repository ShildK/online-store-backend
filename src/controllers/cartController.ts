import { Product } from './../models/product';
import { ShoppingCartItem } from '../models/shoppingCartItem';
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { UserShoppingCart } from '../models/userShoppingCart';
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bodyParser = require("body-parser");

const productCartFilePath = "cart.json";

const getShoppingCarts = () : UserShoppingCart[] => {
    try {
        let users: UserShoppingCart[] = JSON.parse(fs.readFileSync(productCartFilePath));
        return users;
     } catch (error) {
        return [];
     }
}

const saveShoppingCarts= (productCarts: UserShoppingCart[]) =>{ 
    fs.writeFileSync(productCartFilePath, JSON.stringify(productCarts, null, 2));
}

export const getUserShoppingCartItems = (req: Request, res: Response) => {
    let userMail = (req as any).mail;
    let shoppingCarts = getShoppingCarts();
    let shoppingCart = shoppingCarts.find((pc)=> pc.userMail == userMail)
    if(shoppingCart == undefined)
    {
        shoppingCarts.push({userMail : userMail, products: []})
        saveShoppingCarts(shoppingCarts);
        return res.json([]); 
    }
    return res.json(shoppingCart.products); 
};

export const setUserShoppingCartItems =(req: Request, res: Response) => {
    const userMail = (req as any).mail;
    const shoppingCartItems = req.body as Array<ShoppingCartItem>;

    let shoppingCarts = getShoppingCarts();
    let shoppingCart = shoppingCarts.find((pc)=> pc.userMail == userMail);
    if(shoppingCart == undefined)
    {    
        shoppingCarts.push({userMail: userMail, products: shoppingCartItems})   
    } else {
        shoppingCart.products = shoppingCartItems;
    }
    saveShoppingCarts(shoppingCarts);
    res.send(200) 
}