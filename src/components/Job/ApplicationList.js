export function renderApplicantsList(job) {
    if (job.Applications && job.Applications.length > 0) {
      return (
        <ul>
          {job.Applications.map((application) => (
            <div key={application.id}>
              <li>{application.User.username}</li>
              <li>test</li>
            </div>
          ))}
        </ul>
      );
    } else {
      return <p>No applicants yet.</p>;
    }
  }