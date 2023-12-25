import {
  countJobs,
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
    jobs: async (_, { limit, offset }) => {
      const items = await getJobs(limit, offset);
      const totalCount = await countJobs();

      return {
        items,
        totalCount,
      };
    },

    company: async (_, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw notFoundError('No Company found with id ' + id);
      }

      return company;
    },
  },

  Mutation: {
    createJob: async (_, { input: { title, description } }, { user }) => {
      if (!user) throw unauthorizedError('Missing Authentication');

      const newJob = await createJob({
        companyId: user.companyId,
        title,
        description,
      });

      return newJob;
    },
    deleteJob: async (_, { id }, { user }) => {
      if (!user) throw unauthorizedError('Missing Authentication');
      const deletedJob = await deleteJob(id, user.companyId);
      if (!deleteJob) throw notFoundError('No Company found with id ' + id);

      return deletedJob;
    },
    updateJob: async (_, { input: { id, title, description } }, { user }) => {
      if (!user) throw unauthorizedError('Missing Authentication');

      const updatedJob = await updateJob({
        id,
        title,
        description,
        companyId: user.companyId,
      });
      if (!updatedJob) throw notFoundError('No Company found with id ' + id);

      return updatedJob;
    },
  },

  Job: {
    date: (job) => toIsoDate(job.createdAt),
    company: (job, _args, { companyLoader }) =>
      companyLoader.load(job.companyId),
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

const unauthorizedError = (message) => {
  return new GraphQLError(message, {
    extensions: { code: 'UNAUTHORIZED' },
  });
};
