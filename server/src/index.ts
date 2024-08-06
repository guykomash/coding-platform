import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import { corsOptions } from './config/corsOptions';
import logger from './middleware/logger';
const PORT = 5000;

import codeBlockRouter from './routes/codeblockRoute';

// Logger
app.use(logger);
app.use(cors(corsOptions));

// Routers
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/codeblock', codeBlockRouter);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
