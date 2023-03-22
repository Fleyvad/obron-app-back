import { RequestHandler } from 'express';
import { Project, ProjectModel } from './projects-schema.js';
import { CustomHTTPError } from '../utils/errors/custom-http-error.js';
export const createProjectController: RequestHandler<
  unknown,
  Project | { msg: string },
  Project,
  unknown
> = async (req, res, next) => {
  const { projectName } = req.body;

  try {
    if (!projectName) {
      throw new CustomHTTPError(400, 'your project has no name');
    }

    const newProject: Project = { ...req.body };
    const project = await ProjectModel.create(newProject);
    return res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getAllProjectsController: RequestHandler<
  unknown,
  Project[] | { msg: string }
> = async (_req, res, next) => {
  try {
    const getProjects = await ProjectModel.find({}).exec();
    res.json(getProjects);
  } catch (error) {
    next(error);
  }
};
