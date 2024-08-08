import { Request, Response } from 'express';

import { CodeBlock } from '../models/codeblock';

const codeblocks = [
  {
    codeBlockId: '1',
    name: 'Hello World',
    templateCode: `// Make the function return "Hello World"\nfunction getHelloWorld() {}\ngetHelloWorld();`,
    solutionEval: `Hello World`,
  },
];

// implement this?
export async function getAll(req: Request, res: Response) {
  await saveCodeBlock();
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
    const codeBlock = codeblocks.find((cb) => cb.codeBlockId === codeblockId);
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
    const codeBlock = codeblocks.find((cb) => cb.codeBlockId === codeBlockId);
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

// export async function

export async function saveCodeBlock() {
  console.log('save code block');
  const codeblock = new CodeBlock({
    codeBlockId: '1',
    name: 'Hello World',
    templateCode: `// Make the function return "Hello World"\nfunction getHelloWorld() {}\ngetHelloWorld();`,
    solutionEval: `Hello World`,
  });

  const _id = await CodeBlock.exists({ codeBlockId: codeblock.codeBlockId });
  if (!_id) {
    await codeblock.save();
    console.log('created codeblock', codeblock);
  } else {
    console.log(`codeBlockId ${codeblock.codeBlockId} exists `);
  }
}
