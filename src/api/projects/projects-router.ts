import express from 'express';
import {
  createProjectController,
  getAllProjectsController,
} from './projects-controllers.js';

export const projectsRouter = express.Router();

projectsRouter.route('/create').post(createProjectController);

projectsRouter.route('/').get(getAllProjectsController);

export default projectsRouter;
