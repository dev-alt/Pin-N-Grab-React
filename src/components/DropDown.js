import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const locationsData = [
    { id: 7, regionName: 'Northland', cityName: 'Whangarei' },
    { id: 8, regionName: 'Northland', cityName: 'Kaitaia' },
    { id: 9, regionName: 'Northland', cityName: 'Dargaville' },
    { id: 10, regionName: 'Northland', cityName: 'Kerikeri' },
    { id: 11, regionName: 'Northland', cityName: 'Kaikohe' },
    { id: 12, regionName: 'Northland', cityName: 'Warkworth' },
    { id: 13, regionName: 'Auckland', cityName: 'Auckland' },
    { id: 14, regionName: 'Auckland', cityName: 'Manukau' },
    { id: 15, regionName: 'Auckland', cityName: 'Waitakere' },
    { id: 16, regionName: 'Auckland', cityName: 'North Shore' },
    { id: 17, regionName: 'Auckland', cityName: 'Papakura' },
    { id: 18, regionName: 'Auckland', cityName: 'Franklin' },
    { id: 19, regionName: 'Waikato', cityName: 'Hamilton' },
    { id: 20, regionName: 'Waikato', cityName: 'Cambridge' },
    { id: 21, regionName: 'Waikato', cityName: 'Te Awamutu' },
    { id: 22, regionName: 'Waikato', cityName: 'Huntly' },
    { id: 23, regionName: 'Waikato', cityName: 'Taupo' },
    { id: 24, regionName: 'Waikato', cityName: 'Thames' },
    { id: 25, regionName: 'Bay of Plenty', cityName: 'Tauranga' },
    { id: 26, regionName: 'Bay of Plenty', cityName: 'Rotorua' },
    { id: 27, regionName: 'Bay of Plenty', cityName: 'Whakatane' },
    { id: 28, regionName: 'Bay of Plenty', cityName: 'Opotiki' },
    { id: 29, regionName: 'Bay of Plenty', cityName: 'Katikati' },
    { id: 30, regionName: 'Bay of Plenty', cityName: 'Te Puke' },
    { id: 31, regionName: 'Gisborne', cityName: 'Gisborne' },
    { id: 32, regionName: 'Gisborne', cityName: 'Tolaga Bay' },
    { id: 33, regionName: 'Gisborne', cityName: 'Makaraka' },
    { id: 34, regionName: 'Gisborne', cityName: 'Patutahi' },
    { id: 35, regionName: 'Gisborne', cityName: 'Manutuke' },
    { id: 36, regionName: 'Gisborne', cityName: 'Ormond' },
    { id: 37, regionName: 'Hawke\'s Bay', cityName: 'Napier' },
    { id: 38, regionName: 'Hawke\'s Bay', cityName: 'Hastings' },
    { id: 39, regionName: 'Hawke\'s Bay', cityName: 'Havelock North' },
    { id: 40, regionName: 'Hawke\'s Bay', cityName: 'Waipawa' },
    { id: 41, regionName: 'Hawke\'s Bay', cityName: 'Waipukurau' },
    { id: 42, regionName: 'Hawke\'s Bay', cityName: 'Wairoa' },
    { id: 43, regionName: 'Taranaki', cityName: 'New Plymouth' },
    { id: 44, regionName: 'Taranaki', cityName: 'Hawera' },
    { id: 45, regionName: 'Taranaki', cityName: 'Stratford' },
    { id: 46, regionName: 'Taranaki', cityName: 'Inglewood' },
    { id: 47, regionName: 'Taranaki', cityName: 'Eltham' },
    { id: 48, regionName: 'Taranaki', cityName: 'Waitara' },
    { id: 49, regionName: 'Manawatu-Wanganui', cityName: 'Palmerston North' },
    { id: 50, regionName: 'Manawatu-Wanganui', cityName: 'Whanganui' },
    { id: 51, regionName: 'Manawatu-Wanganui', cityName: 'Levin' },
    { id: 52, regionName: 'Manawatu-Wanganui', cityName: 'Feilding' },
    { id: 53, regionName: 'Manawatu-Wanganui', cityName: 'Marton' },
    { id: 54, regionName: 'Manawatu-Wanganui', cityName: 'Foxton' },
    { id: 55, regionName: 'Wellington', cityName: 'Wellington' },
    { id: 56, regionName: 'Wellington', cityName: 'Lower Hutt' },
    { id: 57, regionName: 'Wellington', cityName: 'Upper Hutt' },
    { id: 58, regionName: 'Wellington', cityName: 'Porirua' },
    { id: 59, regionName: 'Wellington', cityName: 'Kapiti' },
    { id: 60, regionName: 'Wellington', cityName: 'Masterton' },
    { id: 61, regionName: 'Tasman', cityName: 'Nelson' },
    { id: 62, regionName: 'Tasman', cityName: 'Richmond' },
    { id: 63, regionName: 'Tasman', cityName: 'Motueka' },
    { id: 64, regionName: 'Tasman', cityName: 'Mapua' },
    { id: 65, regionName: 'Tasman', cityName: 'Wakefield' },
    { id: 66, regionName: 'Tasman', cityName: 'Murchison' },
    { id: 67, regionName: 'Marlborough', cityName: 'Blenheim' },
    { id: 68, regionName: 'Marlborough', cityName: 'Picton' },
    { id: 69, regionName: 'Marlborough', cityName: 'Havelock' },
    { id: 70, regionName: 'Marlborough', cityName: 'Seddon' },
    { id: 71, regionName: 'Marlborough', cityName: 'Renwick' },
    { id: 72, regionName: 'Marlborough', cityName: 'Ward' },
    { id: 73, regionName: 'West Coast', cityName: 'Greymouth' },
    { id: 74, regionName: 'West Coast', cityName: 'Hokitika' },
    { id: 75, regionName: 'West Coast', cityName: 'Westport' },
    { id: 76, regionName: 'West Coast', cityName: 'Runanga' },
    { id: 77, regionName: 'West Coast', cityName: 'Reefton' },
    { id: 78, regionName: 'West Coast', cityName: 'Franz Josef' },
    { id: 79, regionName: 'Canterbury', cityName: 'Christchurch' },
    { id: 80, regionName: 'Canterbury', cityName: 'Timaru' },
    { id: 81, regionName: 'Canterbury', cityName: 'Ashburton' },
    { id: 82, regionName: 'Canterbury', cityName: 'Rangiora' },
    { id: 83, regionName: 'Canterbury', cityName: 'Kaiapoi' },
    { id: 84, regionName: 'Canterbury', cityName: 'Lincoln' },
    { id: 85, regionName: 'Otago', cityName: 'Dunedin' },
    { id: 86, regionName: 'Otago', cityName: 'Oamaru' },
    { id: 87, regionName: 'Otago', cityName: 'Queenstown' },
    { id: 88, regionName: 'Otago', cityName: 'Wanaka' },
    { id: 89, regionName: 'Otago', cityName: 'Balclutha' },
    { id: 90, regionName: 'Otago', cityName: 'Milton' },
    { id: 91, regionName: 'Southland', cityName: 'Invercargill' },
    { id: 92, regionName: 'Southland', cityName: 'Gore' },
    { id: 93, regionName: 'Southland', cityName: 'Winton' },
    { id: 94, regionName: 'Southland', cityName: 'Te Anau' },
    { id: 95, regionName: 'Southland', cityName: 'Bluff' },
    { id: 96, regionName: 'Southland', cityName: 'Riverton' }
  ];
  

  function Dropdown({ label, value, onChange }) {
    const regions = [...new Set(locationsData.map((location) => location.regionName))];
  
    // Function to handle the dropdown value change
    const handleDropdownChange = (event) => {
      const selectedValue = event.target.value;
      onChange(selectedValue);
    };
  
    return (
      <TextField
        select
        fullWidth
        variant="outlined"
        label={label}
        value={value}  // Make sure value is always defined and controlled
        onChange={handleDropdownChange}  // Call the custom handler to update the value
      >
        {regions.map((region, index) => (
          <div key={index}>
            <MenuItem disabled>{region}</MenuItem>
            {locationsData
              .filter((location) => location.regionName === region)
              .map((location) => (
                <MenuItem key={location.id} value={location.cityName}> {/* Use cityName as the value */}
                  {location.cityName}
                </MenuItem>
              ))}
          </div>
        ))}
      </TextField>
    );
  }
  export default Dropdown;