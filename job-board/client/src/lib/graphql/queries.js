import { gql } from '@apollo/client';

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

export const CompanyByIdQuery = gql`
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

export const JobsQuery = gql`
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

export const JobByIdQuery = gql`
  ${jobDetailFragment}

  query JobById($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
`;
