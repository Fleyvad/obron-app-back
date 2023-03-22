import express from 'express';
import projectsRouter from './projects/projects-router.js';

const router = express.Router();

router.use('/projects', projectsRouter);

export default router;
