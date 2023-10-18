import React from 'react';
import { Box } from '@mui/material';
import { IconButton } from '@mui/material';
import {
  ElectricalServices,
  LocalFlorist,
  LocalShipping,
  Palette,
  Build,
  Clear,
} from '@mui/icons-material';

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
        <ElectricalServices />
      </IconButton>
      <IconButton
        color={selectedCategories.includes(2) ? 'secondary' : 'primary'}
        onClick={() => toggleCategory(2)}
      >
        <LocalFlorist />
      </IconButton>
      <IconButton
        color={selectedCategories.includes(3) ? 'secondary' : 'primary'}
        onClick={() => toggleCategory(3)}
      >
        <LocalShipping />
      </IconButton>
      <IconButton
        color={selectedCategories.includes(4) ? 'secondary' : 'primary'}
        onClick={() => toggleCategory(4)}
      >
        <Palette />
      </IconButton>
      <IconButton
        color={selectedCategories.includes(5) ? 'secondary' : 'primary'}
        onClick={() => toggleCategory(5)}
      >
        <Build />
      </IconButton>
      <IconButton color="primary" onClick={handleClearFilters}>
        <Clear />
      </IconButton>
    </Box>
  );
};

export default CategoryFilter;
