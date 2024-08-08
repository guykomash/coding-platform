import 'dotenv/config';
import express from 'express';
const app = express();
const PORT = 5000;
import cors from 'cors';
import logger from './middleware/logger';
import { corsOptions } from './config/corsOptions';
import codeBlockRouter from './routes/codeblockRoute';
import { createServer } from 'http';
import { socket } from './socket';
const server = createServer(app);
import mongoose from 'mongoose';
import { connectDB } from './config/dbConnection';

connectDB();

app.use(logger);
app.use(cors(corsOptions));

// Attach socket logic to server
socket(server);

// Routes
app.use('/codeblock', codeBlockRouter);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
