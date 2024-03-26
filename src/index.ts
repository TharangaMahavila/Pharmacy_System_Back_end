import express from 'express';
import dotenv from 'dotenv';
import { routes } from './routes/index.routes';
import { getDBInstance } from './database';
import bodyParser from 'body-parser';
import userService from './service/user.service';
import session, { Store } from 'express-session';
import passport from 'passport';
import SQLiteStore from 'connect-sqlite3';

const app = express();

let envFilePath = process.env.NODE_ENV ? `./environments/.env.${process.env.NODE_ENV}` : `./environments/.env`

dotenv.config({path: envFilePath});

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const sessionExpireValue: number = parseInt(process.env.SESSION_TIMEOUT?.split('*').reduce((total:string, number:string) => {
  return (parseInt(total)*parseInt(number)).toString();
}) || '3600000')


app.use(session({
  secret: process.env.SESSION_SECRET || 'session_secret', 
  resave: false, 
  saveUninitialized: false,
  store: new (SQLiteStore(session))({
    db: './pharmacy_system.db',
    table: 'sessions',
    dir: './'
  }) as unknown as Store,
  cookie: {
    maxAge: sessionExpireValue
  }
 }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/', routes);

getDBInstance();
userService.create({
  username: 'admin', 
  firstName: 'admin', 
  lastName: undefined,
  role: 'Owner',
  password: 'admin'
})

// start the server
app.listen(process.env.PORT, () => {
  console.log(
    `server running : http://localhost:${process.env.PORT}`
  );
});