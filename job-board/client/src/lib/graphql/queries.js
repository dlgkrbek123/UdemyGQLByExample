import { gql } from '@apollo/client';
import { apolloClient } from './apollo';

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
  const result = await apolloClient.query({ query });

  return result.data.jobs;
}

export async function getJob(id) {
  const query = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        id
        date
        title
        description
        company {
          id
          name
        }
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
