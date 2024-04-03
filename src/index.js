import express from 'express';
import {router} from './routes/routes.js';
import {connectDB} from './middleware/connectDB.js';
import cors from 'cors'

const app = express();
app.use(cors());
app.use(connectDB)

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Routes
app.get('/', (req, res) => {
    res.send("Hello World! Mario Salazar")
})
app.use('/api', router)

app.listen(3000)
console.log('Hello, server on port 3000 ')