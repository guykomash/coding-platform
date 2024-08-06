import { Router } from 'express';
import { getAll, getCodeBlock } from '../controllers/codeblockController';

const router = Router();

// Fetch the names of the code blocks, to be displayed in the lobby.
router.get('/', getAll);

// Fetch the full data of a code block
router.get('/:codeblockId', getCodeBlock);

export default router;
