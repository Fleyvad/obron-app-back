import { Project, ProjectModel } from './projects-schema';
import { Request, Response } from 'express';
import {
  createProjectController,
  getAllProjectsController,
} from './projects-controllers';
import mongoose from 'mongoose';

describe('Given a controller to create projects', () => {
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
    locals: { imgUrl: 'https//:Obron' },
  } as Partial<Response<Project | { message: string }>>;

  const next = jest.fn();

  const project = {
    projectName: 'Name',
    date: 1999,
    description: 'Cositas de obras',
    resources: {
      date: 1999,
      enterprise: 'Obron',
      worker: 'Obronio',
      hours: 3,
      tools: 'pistolete',
      vehicles: 'mini',
    },
    incidences: 'Cositas de obras',
    imgUrl: 'https//:Obron',
  };
  ProjectModel.create = jest.fn().mockRejectedValue(project);

  test('when the user tries to create a project without a title, it should pass on an error', async () => {
    const invalidMockRequest = {
      body: {
        projectName: '',
      },
    } as unknown as Partial<Request>;

    await createProjectController(
      invalidMockRequest as Request<
        unknown,
        Project | { msg: string },
        Project,
        unknown
      >,
      mockResponse as Response<Project | { msg: string }>,
      next,
    );

    expect(next).toHaveBeenCalled();
  });

  test('when a new project is created with a valid name, it should return a 201 status code and the new project', async () => {
    const validMockRequest = {
      body: {
        projectName: 'New Project',
        date: 1999,
        description: 'Cositas de obras',
        resources: {
          date: 1999,
          enterprise: 'Obron',
          worker: 'Obronio',
          hours: 3,
          tools: 'pistolete',
          vehicles: 'mini',
        },
        incidences: 'Cositas de obras',
      },
    } as Partial<Request>;

    const mockNewProject = {
      ...validMockRequest.body,
      imgUrl: mockResponse.locals?.imgUrl,
    };

    ProjectModel.create = jest.fn().mockResolvedValue(mockNewProject);

    await createProjectController(
      validMockRequest as Request<
        unknown,
        Project | { msg: string },
        Project,
        unknown
      >,
      mockResponse as Response<Project | { msg: string }>,
      next,
    );
    expect(mockResponse.json).toHaveBeenCalledWith(mockNewProject);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });
});

describe('Given a controller to get all projects', () => {
  const mockRequest = {} as Partial<Request>;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn();

  const mockProjects = {
    _id: new mongoose.Types.ObjectId('123456789123456789123456'),
    projectName: 'Name',
    date: 1999,
    description: 'Cositas de obras',
    resources: {
      date: 1999,
      enterprise: 'Obron',
      worker: 'Obronio',
      hours: 3,
      tools: 'pistolete',
      vehicles: 'mini',
    },
    incidences: 'Cositas de obras',
    imgUrl: 'https//:Obron',
  };

  test('when the database response is successful, the user should receive a list of projects', async () => {
    ProjectModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockProjects) });

    await getAllProjectsController(
      mockRequest as Request,
      mockResponse as Response,
      next,
    );

    expect(mockResponse.json).toHaveBeenCalledWith(mockProjects);
  });

  test('when an error is thrown, it should be passed on to be handled', async () => {
    ProjectModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockRejectedValue(null) });

    await getAllProjectsController(
      mockRequest as Request,
      mockResponse as Response,
      next,
    );

    expect(next).toHaveBeenCalled();
  });
});
