import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useMediaQuery } from '@mui/material';

function ImageCarousel({ images }) {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Carousel
      autoPlay="false"
      swipe="true"
      animation="slide"
      navButtonsAlwaysVisible
      cycleNavigation="false"
      sx={{ textAlign: 'center', marginTop: '20px' }}
    >
      {images.map((item, index) => (
        <img
          key={index}
          src={item.imgUrl}
          alt={item.alt}
          width={isSmallScreen ? '100%' : '70%'}
        />
      ))}
    </Carousel>
  );
}

export default ImageCarousel;
