import express from 'express'; 
import { Blog } from './models/blogschema';
import { user } from './models/userschema';
import authRoutes from './routes/auth';
import crudRoutes from './routes/blogs';
import * as dotenv from 'dotenv';
import {Request, Response, NextFunction} from 'express';
dotenv.config()
import {connectDb} from './utils/db';
import cors from "cors"

const app = express();

app.use(express.json())
app.use(cors())

connectDb()

const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes); 
app.use("/api/blogs", crudRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');

})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})