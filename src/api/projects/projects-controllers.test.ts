import { Project, ProjectModel } from './projects-schema';
import { Request, Response } from 'express';
import {
  createProjectController,
  getAllProjectsController,
  getProjectByIdController,
} from './projects-controllers';
import mongoose from 'mongoose';
import { CustomHTTPError } from '../utils/errors/custom-http-error';

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

const mockProject = {
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

describe('Given a controller to get all projects', () => {
  const mockRequest = {} as Partial<Request>;

  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const next = jest.fn();

  test('when the database response is successful, the user should receive a list of projects', async () => {
    ProjectModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockProject) });

    await getAllProjectsController(
      mockRequest as Request,
      mockResponse as Response,
      next,
    );

    expect(mockResponse.json).toHaveBeenCalledWith({ projects: mockProject });
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
describe('Given a getByIdcontroller business', () => {
  const request = {
    params: { id: '123456789123456789123456' },
  } as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;
  const next = jest.fn();

  ProjectModel.findById = jest.fn().mockImplementation(() => ({
    exec: jest.fn().mockResolvedValue(mockProject),
  }));

  describe('When the user tries to search for a business by id', () => {
    test('Then it should be found', async () => {
      await getProjectByIdController(
        request as Request,
        response as Response,
        next,
      );

      expect(response.json).toHaveBeenCalledWith(mockProject);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(ProjectModel.findById).toHaveBeenCalledWith(
        '123456789123456789123456',
      );
    });
  });
  describe('When the user tries to search  for a project by id and dont exist', () => {
    test('Then it should recived a 404 error', async () => {
      ProjectModel.findById = jest.fn().mockImplementation(() => ({
        exec: jest.fn().mockResolvedValue(null),
      }));
      await getProjectByIdController(
        request as Request,
        response as Response,
        next,
      );
      expect(next).toHaveBeenCalledWith(
        new CustomHTTPError(404, 'This OBRON does not exist'),
      );
    });
  });
});
