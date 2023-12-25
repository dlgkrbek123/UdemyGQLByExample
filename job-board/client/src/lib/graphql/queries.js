import { gql } from '@apollo/client';
import { apolloClient } from './apollo';

export const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    date
    title
    description
    company {
      id
      name
    }
  }
`;

export async function getJobs() {
  const query = gql`
    query Jobs {
      jobs {
        id
        date
        title
        company {
          id
          name
        }
      }
    }
  `;
  const result = await apolloClient.query({
    query,
    fetchPolicy: 'network-only',
  });

  return result.data.jobs;
}

export async function getJob(id) {
  const query = gql`
    ${jobDetailFragment}

    query JobById($id: ID!) {
      job(id: $id) {
        ...JobDetail
      }
    }
  `;
  const result = await apolloClient.query({ query, variables: { id } });

  return result.data.job;
}

export async function getCompany(id) {
  const query = gql`
    query CompanyById($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          date
          title
        }
      }
    }
  `;
  const result = await apolloClient.query({
    query,
    variables: {
      id,
    },
  });

  return result.data.company;
}
