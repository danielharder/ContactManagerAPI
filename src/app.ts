import express from 'express';
import contactsRouter from "./contacts/contacts.routes";
import logger from './middleware/logger.middleware';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

//logger
if(process.env.NODE_ENV == 'development'){
    app.use(logger);
    console.log(process.env.GREETING + ' in dev mode')
}

//parse json bodies
app.use(express.json());
//parse URL-encoded bodies
app.use(express.urlencoded({extended: true}));

//enable cors requests
app.use(cors());

// helmet security middleware
app.use(helmet());

// Routes
app.use('/', [contactsRouter]);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
