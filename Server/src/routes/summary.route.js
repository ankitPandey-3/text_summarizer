import express from 'express';
import { textSummarizer } from '../controllers/summarizer.controllers.js';

const router = express.Router();

router.post('/summarizer', textSummarizer);

export default router;