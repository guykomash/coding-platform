import { Request, Response } from 'express';

const codeblocks = [
  {
    id: '1',
    name: 'Hello World',
    templateCode: `let x = "Hello World";\nreturn x;`,
    solutionEval: `Hello World`,
  },
  {
    id: '2',
    name: 'Catching Errors',
    templateCode: `try {\nconsole.log(x)\n} catch (err) {\nconsole.log(err)\n}`,
    solutionEval: ``,
  },
  {
    id: '3',
    name: 'Async case',
    templateCode: `// async await and stuff...\n// asyns await and stuff...\nreturn (2 + 2)`,
    solutionEval: `4`,
  },
  {
    id: '4',
    name: '== vs ===',
    templateCode: `console.log(4 == '4');\nconsole.log(4==='4');`,
    solutionEval: ``,
  },
];

export async function getAll(req: Request, res: Response) {
  res.status(200).send(JSON.stringify(codeblocks));
}

export async function getCodeBlock(req: Request, res: Response) {
  try {
    const codeblockId = req.params.codeblockId;
    if (!codeblockId) {
      return res
        .status(500)
        .send({ message: 'No code block id was found in the request.' });
    }

    // get the code block (from db)
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

export async function getCodeBlockData(codeBlockId: string) {
  try {
    if (!codeBlockId) {
      console.error('getCodeBlockData() : No codeBlockId');
      return;
    }

    // Implement later with db
    // get the code block (from db) => should be awaited
    const codeBlock = codeblocks.find((cb) => cb.id === codeBlockId);
    if (!codeBlock) {
      console.error(
        `getCodeBlockData(): No code block with codeBlockId=${codeBlockId}`
      );
      return;
    }
    // All good. return codeBlock
    return codeBlock;
  } catch (err) {
    console.error(err);
    return;
  }
}
