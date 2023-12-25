import { gql } from '@apollo/client';
import { apolloClient } from './apollo';

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation createJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        id
      }
    }
  `;
  const result = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } },
  });

  return result.data.job;
}
