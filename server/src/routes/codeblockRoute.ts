import { Router } from 'express';
import { fetchAll } from '../controllers/codeblockController';

const router = Router();

router.get('/', fetchAll);

export default router;
