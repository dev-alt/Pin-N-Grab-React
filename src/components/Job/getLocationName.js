import locationsData from '../Locations';

export function getLocationName(locationId) {
    const location = locationsData.find((item) => item.id === locationId);
    if (location) {
      return `${location.cityName}, ${location.regionName}`;
    } else {
      return 'Unknown Location';
    }
}
