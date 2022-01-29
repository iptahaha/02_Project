import express from 'express';
import { Request, Response } from 'express';
const path = require("node:path");

const router = express.Router();

router.get('/', (req:Request, res:Response) => {
    res.redirect('/main')
})

router.get('/login', (req:Request, res:Response) => {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/login.html'))
})

router.get('/register', (req:Request, res:Response) => {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/register.html'))
})

router.get('/main', (req:Request, res:Response) => {
    res.sendfile(path.resolve(path.resolve(), '../web', 'dist/main.html'))
})

export default router;
