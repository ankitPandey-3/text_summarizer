import express from 'express';
import { textSummarizer, saveSummarizer } from '../controllers/summarizer.controllers.js';

const router = express.Router();

router.post('/summarizer', textSummarizer);
router.post('/summarizer/save', saveSummarizer);

export default router;