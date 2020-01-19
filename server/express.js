import express from 'express'
import path from 'path'
const passport = require('passport');
import CONFIG from './../config'
import bodyParser from 'body-parser'
import Template from './../template.js'

import authController from './controllers/auth'
import postsController from './controllers/posts'

import cors from 'cors'
import cookieSession from 'cookie-session'

import './services/passport';

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(bodyParser.json({limit: '10mb', extended: true}))

const CURRENT_WORKING_DIR = process.cwd();

app.use(
   cookieSession({
     maxAge: 30 * 24 * 60 * 60 * 1000,
     keys: [CONFIG.COOKIEKEY]
   })
 );

 app.use(passport.initialize());
 app.use(passport.session());

app.use(express.static(path.join(CURRENT_WORKING_DIR, 'public')));

//comment out before building for production
import devBundle from './devBundle'
//comment out before building for production
devBundle.compile(app)

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use('/api', authController(express.Router()));
app.use('/api', postsController(express.Router()));


app.get('*', (req, res)=>{
   res.send(Template());
})

export default app;