import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req:Request, res:Response) => {
  res.json({
    "MESSAGE":"API ACTIVE",
    "STATUS":200
  });
});

app.listen( process.env.PORT || 3000, () => {
  console.log(`Server listening on 3000`);
});