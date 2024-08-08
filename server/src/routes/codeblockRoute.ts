import { Router } from 'express';
import { getAll, getCodeBlock } from '../controllers/codeblockController';

const router = Router();

router.get('/', getAll);

router.get('/:codeblockId', getCodeBlock);

export default router;
