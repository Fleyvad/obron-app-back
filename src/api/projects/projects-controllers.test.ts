import { Project, ProjectModel } from './projects-schema';
import { Request, Response } from 'express';
import { createProjectController } from './projects-controllers';

describe('Given a controller to create projects', () => {
  const mockResponse = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
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
    incidences: {
      description: 'Cositas de obras',
      imgUrl: 'https//:Obron',
    },
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
      },
    } as Partial<Request>;

    const mockNewProject = {
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
      incidences: {
        description: 'Cositas de obras',
        imgUrl: 'https//:Obron',
      },
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

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(mockNewProject);
  });
});
