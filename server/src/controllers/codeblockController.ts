import { Request, Response } from 'express';

const codeblocks = [
  {
    id: '1',
    name: 'Hello World',
    codeLines: ['let x = "Hello World";', "console.log(x)'"],
  },
  {
    id: '2',
    name: 'Catching Errors',
    codeLines: [
      'try {',
      'console.log(x)',
      '} catch (err) {',
      'console.log(err)',
      '}',
    ],
  },
  {
    id: '3',
    name: 'Async case',
    codeLines: ['async await and stuff...', 'asyns await and stuff...'],
  },
  {
    id: '4',
    name: '== vs ===',
    codeLines: ["console.log(4 == '4')", "console.log(4==='4')"],
  },
];
// getting
export function getAll(req: Request, res: Response) {
  console.log('fetchAll() in codeblockController');

  res.status(200).send(JSON.stringify(codeblocks));
}

export function getCodeBlock(req: Request, res: Response) {
  try {
    const codeblockId = req.params.codeblockId;
    if (!codeblockId) {
      return res
        .status(500)
        .send({ message: 'No code block id was found in the request.' });
    }

    const codeBlock = codeblocks.find((cb) => cb.id === codeblockId);
    if (!codeBlock) {
      return res
        .status(400)
        .json({
          message: `No code block with id = ${codeblockId} is found. Bad Request`,
        })
        .end();
    }

    res.status(200).json(codeBlock);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Something went wrong in server...' })
      .end();
  }
}
