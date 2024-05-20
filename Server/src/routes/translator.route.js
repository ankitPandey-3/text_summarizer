import express from 'express';
import { textTranslate } from '../controllers/translator.controllers.js';

const router = express.Router();

router.post('/translate', textTranslate);


export default router;