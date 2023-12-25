import { useJobs } from '../lib/graphql/hooks';
import JobList from '../components/JobList';

function HomePage() {
  const { jobs, loading, error } = useJobs();

  if (loading) return <div>...Loading</div>;
  if (error) return <div className="has-text-danger">Data unavailable</div>;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
