import express from 'express';
import dotenv from 'dotenv';

const app = express();

let envFilePath = process.env.NODE_ENV ? `./environments/.env.${process.env.NODE_ENV}` : `./environments/.env`

dotenv.config({path: envFilePath});

// start the server
app.listen(process.env.PORT, () => {
  console.log(
    `server running : http://localhost:${process.env.PORT}`
  );
});