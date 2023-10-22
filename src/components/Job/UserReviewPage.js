import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import UserReview from './UserReviews';

const UserReviewsPage = ({ reviews, isSmallScreen }) => {
  return (
    <Box sx={{ margin: '30px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '20px',
          marginTop: '30px',
        }}
      >
        <Typography gutterBottom variant={isSmallScreen ? 'h6' : 'h5'}>
          <StarRoundedIcon fontSize="inherit" />
          5.0
        </Typography>
        {'|'}
        <Typography variant={isSmallScreen ? 'h6' : 'h5'}>
          {reviews.length} Reviews
        </Typography>
      </Box>

      <Grid container sx={{ marginRight: '20px', marginTop: '40px' }}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} key={review.id}>
            <UserReview
              key={review.id}
              reviewUserName={review.Job.User.username}
              date={review.createdAt}
              review={review.reviewText}
              rating={review.rating}
              jobReviewed={review}
              userId={review.Job.User.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UserReviewsPage;
