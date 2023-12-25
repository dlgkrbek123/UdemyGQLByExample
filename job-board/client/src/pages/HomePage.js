import { useState } from 'react';
import { useJobs } from '../lib/graphql/hooks';
import PaginationBar from '../components/PaginationBar';
import JobList from '../components/JobList';

const JOBS_PER_PAGE = 4;

function HomePage() {
  const [page, setPage] = useState(1);
  const { jobs, totalCount, loading, error } = useJobs(
    JOBS_PER_PAGE,
    (page - 1) * JOBS_PER_PAGE
  );

  if (loading) return <div>...Loading</div>;
  if (error) return <div className="has-text-danger">Data unavailable</div>;

  const totalPages = Math.ceil(totalCount / JOBS_PER_PAGE);

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <PaginationBar
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
