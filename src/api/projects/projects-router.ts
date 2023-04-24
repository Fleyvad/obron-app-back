import express from 'express';
import { validate } from 'express-validation';
import { projectValidation } from '../auth/auth-validation.js';
import { upload } from './img-upload-middleware.js';
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
} from './projects-controllers.js';
import { supabaseMiddleware } from './supabase-middleware.js';

export const projectsRouter = express.Router();

projectsRouter
  .route('/create')
  .post(
    validate(projectValidation),
    upload.single('upload'),
    supabaseMiddleware,
    createProjectController,
  );

projectsRouter.route('/').get(getAllProjectsController);
projectsRouter.route('/:id').get(getProjectByIdController);

export default projectsRouter;
