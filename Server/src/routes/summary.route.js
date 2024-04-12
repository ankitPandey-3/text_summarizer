import express from 'express';
import { textSummarizer, saveSummarizer, getSaved, getSavedByTitle } from '../controllers/summarizer.controllers.js';

const router = express.Router();

router.post('/summarizer', textSummarizer);
router.post('/summarizer/save', saveSummarizer);
router.get('/summarizer/saved', getSaved);
router.get('/summarizer/saved/:title', getSavedByTitle);

export default router;