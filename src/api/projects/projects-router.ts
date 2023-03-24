import express from 'express';
import { validate } from 'express-validation';
import { authMiddleware } from '../auth/auth-middleware.js';
import { projectValidation } from '../auth/auth-validation.js';
import { upload } from './img-upload-middleware.js';
import {
  createProjectController,
  getAllProjectsController,
} from './projects-controllers.js';
import { supabaseMiddleware } from './supabase-middleware.js';

export const projectsRouter = express.Router();

projectsRouter
  .route('/create')
  .post(
    authMiddleware,
    validate(projectValidation),
    upload.single('upload'),
    supabaseMiddleware,
    createProjectController,
  );

projectsRouter.route('/').get(getAllProjectsController);

export default projectsRouter;
