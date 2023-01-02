import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import db from './db.js';
//console.log(process.env.MONGO_URL) 
db.connect();
const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
routes(app)
const port = process.env.PORT || 4000
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})