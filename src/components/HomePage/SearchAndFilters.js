export function sortJobListingsByDate(jobListings) {
    return jobListings.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  
  export function filterJobListings({ jobListings, selectedCategories, selectedLocation, searchQuery }) {
    return jobListings.filter((job) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(job.category_id);
      const matchesLocation = !selectedLocation || selectedLocation === job.location_id;
      const matchesSearch =
        !searchQuery || job.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesLocation && matchesSearch;
    });
  }
  
 export async function fetchJobListings() {
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
  
  