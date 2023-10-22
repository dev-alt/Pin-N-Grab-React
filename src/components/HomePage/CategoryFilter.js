import React from 'react';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import {
  ElectricalServices,
  LocalFlorist,
  LocalShipping,
  Build,
  Clear,
} from '@mui/icons-material';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
const iconStyle = {
  fontSize: { xs: '1.8rem', lg: '2.5rem' },
};

const CategoryFilter = ({
  selectedCategories,
  toggleCategory,
  handleClearFilters,
}) => {
  return (
    <Box>
      <IconButton
        color={selectedCategories.includes(1) ? 'secondary' : 'primary'}
        onClick={() => toggleCategory(1)}
      >
        <ElectricalServices sx={iconStyle} />
      </IconButton>
      <IconButton
        color={selectedCategories.includes(2) ? 'secondary' : 'primary'}
        onClick={() => toggleCategory(2)}
      >
        <LocalFlorist sx={iconStyle} />
      </IconButton>
      <IconButton
        color={selectedCategories.includes(3) ? 'secondary' : 'primary'}
        onClick={() => toggleCategory(3)}
      >
        <LocalShipping sx={iconStyle} />
      </IconButton>
      <IconButton
        color={selectedCategories.includes(4) ? 'secondary' : 'primary'}
        onClick={() => toggleCategory(4)}
      >
        <FormatPaintIcon sx={iconStyle} />
      </IconButton>
      <IconButton
        color={selectedCategories.includes(5) ? 'secondary' : 'primary'}
        onClick={() => toggleCategory(5)}
      >
        <Build sx={iconStyle} />
      </IconButton>
      <IconButton color="primary" onClick={handleClearFilters}>
        <Clear />
      </IconButton>
    </Box>
  );
};

export default CategoryFilter;
