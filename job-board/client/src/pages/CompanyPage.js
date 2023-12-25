import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getCompany } from '../lib/graphql/queries.js';
import JobList from '../components/JobList.js';

function CompanyPage() {
  const { companyId } = useParams();
  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    // async 즉시 호출
    (async () => {
      try {
        const company = await getCompany(companyId);
        setState({ company, loading: false, error: false });
      } catch (e) {
        console.log('error:', JSON.stringify(e, null, 2));
        setState({ company: null, loading: false, error: true });
      }
    })();
  }, []);

  const { company, loading, error } = state;

  if (loading) return <div>Loading....</div>;
  if (error) return <div className="has-text-danger">Data unavailable</div>;

  return (
    company && (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h2 className="title is-5">Jobs at {company.name}</h2>
        <JobList jobs={company.jobs} />
      </div>
    )
  );
}

export default CompanyPage;
