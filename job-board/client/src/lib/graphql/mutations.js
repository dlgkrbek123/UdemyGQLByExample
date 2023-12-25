import { gql } from '@apollo/client';
import { apolloClient } from './apollo';
import { jobDetailFragment } from './queries';

export async function createJob({ title, description }) {
  const mutation = gql`
    ${jobDetailFragment}

    mutation createJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
  `;
  const result = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } },
    update: (cache, result) => {
      cache.writeQuery({
        query: gql`
          ${jobDetailFragment}

          query JobById($id: ID!) {
            job(id: $id) {
              ...JobDetail
            }
          }
        `,
        variables: { id: result.data.job.id },
        data: result.data,
      });
    },
  });

  return result.data.job;
}
