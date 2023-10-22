async function fetchJobListings() {
  try {
    const response = await fetch('/api/jobs/all');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch job listings.');
    }
  } catch (error) {
    throw error;
  }
}

export { fetchJobListings };
