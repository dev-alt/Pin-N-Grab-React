import locationsData from '../Locations';

export function getLocationName(locationId) {
    const location = locationsData.find((item) => item.id === locationId);
    if (location) {
        return `${location.cityName}, ${location.regionName}`;
    } else {
        return 'Unknown Location';
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
        imgUrl: 'https://picsum.photos/id/0/5000/3333',
        alt: 'Image 1 Alt Text',
    },
    {
        imgUrl: 'https://picsum.photos/id/4/5000/3333',
        alt: 'Image 2 Alt Text',
    },
    {
        imgUrl: 'https://picsum.photos/id/8/5000/3333',
        alt: 'Image 3 Alt Text',
    },
    // Add more objects as needed
];
