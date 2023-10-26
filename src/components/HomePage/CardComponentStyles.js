import {
  ElectricalServices,
  LocalFlorist,
  LocalShipping,
  Build,
} from '@mui/icons-material';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
const cardStyle = {
  mt: 2,
  mb: 2,
  border: '1px solid',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: { xs: '80vw', sm: '40vw', md: '28vw', lg: '18vw', xl: '280px' },
};

const itemStyle = {
  display: 'flex',
  alignItems: 'centre',
};

function getIconByCategoryId(categoryId) {
  const iconSize = 'large';

  switch (categoryId) {
    case 1:
      return <ElectricalServices fontSize={iconSize} />;
    case 2:
      return <LocalShipping fontSize={iconSize} />;
    case 3:
      return <LocalFlorist fontSize={iconSize} />;
    case 4:
      return <FormatPaintIcon fontSize={iconSize} />;
    case 5:
      return <Build fontSize={iconSize} />;
    default:
      return null;
  }
}

function getColourByAmount(amount) {
  if (amount < 500) {
    return '#f0df46';
  } else if (amount >= 500 && amount < 1000) return '#f5a65d';
  else if (amount >= 1000 && amount < 1500) return '#09bab7';
  else if (amount >= 1500 && amount < 2000) return '#9379a8';
  else return '#ab5546';
}

export { cardStyle, itemStyle, getIconByCategoryId, getColourByAmount };
