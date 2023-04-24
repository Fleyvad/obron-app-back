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

    const newProject: Project = { ...req.body, imgUrl: res.locals.picture };
    const project = await ProjectModel.create(newProject);
    return res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};

export const getAllProjectsController: RequestHandler<
  unknown,
  { projects: Project[] } | { msg: string }
> = async (_req, res, next) => {
  try {
    const getProjects = await ProjectModel.find({}).exec();
    res.json({ projects: getProjects });
  } catch (error) {
    next(error);
  }
};

export const getProjectByIdController: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { id } = req.params;

  const project = await ProjectModel.findById(id).exec();
  if (project === null) {
    return next(new CustomHTTPError(404, 'This OBRON does not exist'));
  }

  res.status(200).json(project);
};
