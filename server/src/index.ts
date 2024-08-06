import express, { Request, Response } from 'express';
const app = express();
const PORT = 5000;

// Routers

import codeBlockRouter from './routes/codeblockRoute';

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/codeblock', codeBlockRouter);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
