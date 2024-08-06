import { Request, Response } from 'express';

async function fetchAll(req: Request, res: Response) {
  console.log('fetchAll() in codeblockController');
  res.status(200).send('Fetched all Hard codded code blocks.');
}

export { fetchAll };
