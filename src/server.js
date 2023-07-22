// const express = require('express')
import express from 'express'
import configViewEngine from './configs/viewEngine.js'

import 'dotenv/config'
import initWebRoute from './route/web.js'
import initAPIRoute from './route/api.js'
// import connection from './configs/connectDB.js'
const app = express()
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
configViewEngine(app);


initWebRoute(app);
initAPIRoute(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})