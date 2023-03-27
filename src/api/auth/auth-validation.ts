import { Joi } from 'express-validation';

export const loginValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};
export const registerValidation = {
  body: Joi.object({
    userName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

export const projectValidation = {
  body: Joi.object({
    projectName: Joi.string(),
    date: Joi.number(),
    description: Joi.string(),
    resources: Joi.object({
      date: Joi.number(),
      enterprise: Joi.string(),
      worker: Joi.string(),
      hours: Joi.number(),
      tools: Joi.string(),
      vehicles: Joi.string(),
    }),
    incidences: Joi.string(),
    imgUrl: Joi.string(),
  }),
};
