import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
const jwt = require("jsonwebtoken");
const fs = require("fs");
const bodyParser = require("body-parser");

const usersFilePath = "users.json";
const secretKey = "mySecretKey";

const getUsers = (): User[] => {
   try {
      let users: User[] = JSON.parse(fs.readFileSync(usersFilePath));
      return users;
   } catch (error) {
      return [];
   }
};

function saveUsers(users: User[]) {
   fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

export const authenticateToken = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
         throw new Error();
      }

      const decoded = jwt.verify(token, secretKey);

      jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid token.' });
        }
    
        (req as any).mail = decoded.mail;
        next();
      });

      next();
   } catch (err) {
      res.status(401).send("Пожалуйста авторизуйтесь");
   }
};

export const register = (req: Request, res: Response) => {
   const { mail, password, name } = req.body;
    
   const users = getUsers();
   
   if (users.some((user) => user.mail === mail)) {
      return res.status(400).send("Есть пользователь с такой почтой");
   }

   let newUser = new User();
   newUser.mail = mail;
   newUser.name = name;
   newUser.password = password;

   users.push(newUser);
   saveUsers(users);
   
   res.status(201).send("Регистрация выполнена успешно");
};
export const login = (req: Request, res: Response) => {
    const { mail, password } = req.body;

    const users = getUsers();
  
    const user = users.find(u => u.mail === mail && u.password === password);
  
    if (!user) return res.status(401).send('Неверные данные');

    const token = jwt.sign({mail}, secretKey);

    res.json({ name: user.name, token: token});
 };
 