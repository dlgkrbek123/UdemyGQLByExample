import { gql } from '@apollo/client';
import { jobDetailFragment } from './queries';

export const createJobMutation = gql`
  ${jobDetailFragment}

  mutation createJob($input: CreateJobInput!) {
    job: createJob(input: $input) {
      ...JobDetail
    }
  }
`;
