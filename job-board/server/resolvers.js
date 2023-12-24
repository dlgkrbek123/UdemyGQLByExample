import { getJob, getJobs, getJobsByCompany } from './db/jobs.js';
import { getCompany } from './db/companies.js';

export const resolvers = {
  Query: {
    job: (_, { id }) => getJob(id),
    jobs: () => getJobs(),

    company: (_, { id }) => getCompany(id),
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
