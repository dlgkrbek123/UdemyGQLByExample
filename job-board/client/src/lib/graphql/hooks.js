import { useQuery, useMutation } from '@apollo/client';
import { JobsQuery, JobByIdQuery, CompanyByIdQuery } from './queries';
import { createJobMutation } from './mutations';

export const useCompany = (id) => {
  const { data, loading, error } = useQuery(CompanyByIdQuery, {
    variables: { id },
  });

  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
};

export const useJob = (id) => {
  const { data, loading, error } = useQuery(JobByIdQuery, {
    variables: { id },
  });

  return {
    job: data?.job,
    loading,
    error: Boolean(error),
  };
};

export const useJobs = (limit, offset) => {
  const { data, loading, error } = useQuery(JobsQuery, {
    variables: { limit, offset },
    fetchPolicy: 'network-only',
  });

  return {
    jobs: data?.jobs?.items,
    totalCount: data?.jobs?.totalCount,
    loading,
    error: Boolean(error),
  };
};

export const useCreateJob = () => {
  const [mutate, { loading }] = useMutation(createJobMutation);

  const createJob = async (title, description) => {
    const result = await mutate({
      variables: { input: { title, description } },
      update: (cache, result) => {
        cache.writeQuery({
          query: JobByIdQuery,
          variables: { id: result.data.job.id },
          data: result.data,
        });
      },
    });

    return result.data.job;
  };

  return { loading, createJob };
};
