import mongoose, { Schema } from 'mongoose';

export interface Project {
  projectName: string;
  date: Date;
  description: string;
  resources: {
    date: Date;
    enterprise: string;
    worker: string;
    hours: number;
    tools: string;
    vehicles: string;
  };
  incidences: {
    description: string;
    imgUrl: string;
  };
}

const projectSchema = new Schema<Project>({
  projectName: String,
  date: Date,
  description: String,
  resources: {
    date: Date,
    enterprise: String,
    worker: String,
    hours: Number,
    tools: String,
    vehicles: String,
  },
  incidences: {
    description: String,
    imgUrl: String,
  },
});

export const ProjectModel = mongoose.model<Project>(
  'Project',
  projectSchema,
  'projects',
);
