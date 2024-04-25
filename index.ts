import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan'
import cors from 'cors'
config();
import userRoutes from './Routes/userRoutes'
import bookRoutes from './Routes/bookRoutes'
import basketRoutes from './Routes/basketRoutes'
import bookInfo from './Routes/bookInfoRoutes'
import walletRoutes from './Routes/walletRoutes'
import purchaseRoutes from './Routes/purchaseRoutes'
import path from 'path';
import fs from 'fs'

const app = express();
const PORT = process.env.PORT!;
app.use('/static', express.static(path.join(__dirname, "/assets")))
const booksDirectory = path.join(__dirname, './assets/books');
if (!fs.existsSync(booksDirectory)) {
    fs.mkdirSync(booksDirectory, { recursive: true });
}

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user/', userRoutes)
app.use('/api/book/', bookRoutes)
app.use('/api/basket/', basketRoutes)
app.use('/api/bookInfo/', bookInfo)
app.use('/api/wallet/', walletRoutes)
app.use('/api/purchase/', purchaseRoutes)


app.listen(PORT, () => {
    console.log(`server started on the port = ${PORT}`)
})