import express from 'express';
import { createProjectController } from './projects-controllers.js';

export const projectsRouter = express.Router();

projectsRouter.route('/create').post(createProjectController);

export default projectsRouter;
