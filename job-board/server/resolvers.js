import {
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
} from './db/jobs.js';
import { getCompany } from './db/companies.js';
import { GraphQLError } from 'graphql';

export const resolvers = {
  Query: {
    job: async (_, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw notFoundError(`No Job found with id ${id}`);
      }

      return job;
    },
    jobs: () => getJobs(),

    company: async (_, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError('No Company found with id ' + id);
      }

      return company;
    },
  },

  Mutation: {
    createJob: async (_, { input: { title, description } }) => {
      const newJob = await createJob({
        companyId: 'FjcJCHJALA4i',
        title,
        description,
      });

      return newJob;
    },
    deleteJob: async (_, { id }) => {
      const deletedJob = await deleteJob(id);
      return deletedJob;
    },
    updateJob: async (_, { input: { id, title, description } }) => {
      const updatedJob = await updateJob({
        id,
        title,
        description,
      });

      return updatedJob;
    },
  },

  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job) => getCompany(job.companyId),
  },
  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },
};

const toIsoDate = (value) => {
  return value.slice(0, 'yyyy-mm-dd'.length);
};

const notFoundError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: 'NOT_FOUND' },
  });
};
