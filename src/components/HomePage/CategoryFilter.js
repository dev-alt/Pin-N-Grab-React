import React from 'react';

import { Box, Tooltip } from '@mui/material';

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
        color={selectedCategories.includes(1) ? 'primary' : '#BFC1C4'}
        onClick={() => toggleCategory(1)}
      >
        <ElectricalServices sx={iconStyle} />
      </IconButton>

      <IconButton
        color={selectedCategories.includes(2) ? 'primary' : '#BFC1C4'}
        onClick={() => toggleCategory(2)}
      >
        <LocalShipping sx={iconStyle} />
      </IconButton>

      <IconButton
        color={selectedCategories.includes(3) ? 'primary' : '#BFC1C4'}
        onClick={() => toggleCategory(3)}
      >
        <LocalFlorist sx={iconStyle} />
      </IconButton>

      <IconButton
        color={selectedCategories.includes(4) ? 'primary' : '#BFC1C4'}
        onClick={() => toggleCategory(4)}
      >
        <FormatPaintIcon sx={iconStyle} />
      </IconButton>

      <IconButton
        color={selectedCategories.includes(5) ? 'primary' : '#BFC1C4'}
        onClick={() => toggleCategory(5)}
      >
        <Build sx={iconStyle} />
      </IconButton>

      <Tooltip title="clear filter">
        <IconButton color="#BFC1C4" onClick={handleClearFilters}>
          <Clear />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CategoryFilter;
