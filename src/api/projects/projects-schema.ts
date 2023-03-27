import mongoose, { Schema } from 'mongoose';

export interface Project {
  projectName: string;
  date: number;
  description: string;
  resources: {
    date: number;
    enterprise: string;
    worker: string;
    hours: number;
    tools: string;
    vehicles: string;
  };
  incidences: string;
  imgUrl: string;
}

const projectSchema = new Schema<Project>({
  projectName: String,
  date: Number,
  description: String,
  resources: {
    date: Number,
    enterprise: String,
    worker: String,
    hours: Number,
    tools: String,
    vehicles: String,
  },
  incidences: String,
  imgUrl: String,
});

export const ProjectModel = mongoose.model<Project>(
  'Project',
  projectSchema,
  'projects',
);
