import locationsData from '../Locations';

export function getLocationName(locationId) {
  const location = locationsData.find((item) => item.id === locationId);
  if (location) {
    return `${location.cityName}, ${location.regionName}`;
  } else {
    return 'Unknown Location';
  }
}

export async function fetchReviewsForUser(userId, setReviews) {
  try {
    const response = await fetch(`/api/review/user/${userId}`);
    const data = await response.json();
    setReviews(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
  }
}

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

export const paperStyle = {
  padding: '1rem',
  margin: '1rem',
  boxShadow: '0px 0px 15px 5px rgba(0, 0, 0, 0.2)',
};

export const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
};

export const labelStyle = {
  fontWeight: 'bold',
};

export const images = [
  {
    imgUrl: '0-5000x3333.jpg',
    alt: 'Image 1 Alt Text',
  },
  {
    imgUrl: '4-5000x3333.jpg',
    alt: 'Image 2 Alt Text',
  },
  {
    imgUrl: '8-5000x3333.jpg',
    alt: 'Image 3 Alt Text',
  },
];
