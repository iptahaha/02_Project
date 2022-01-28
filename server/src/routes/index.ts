import { Router, Request, Response } from 'express';
import path from "node:path";

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.render('index')
  //res.redirect('/main');
});

// router.get('/main', (req:Request, res:Response) => {
//   res.sendfile(path.resolve(path.resolve(), '../web', 'dist/main.html'))
// })

export default router;
