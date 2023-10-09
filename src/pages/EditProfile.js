import React from 'react';
import { Container, Grid } from '@mui/material';
import EditProfile from '../components/Profile/EditProfile';
import EditPassword from '../components/Profile/EditPassword';
import DeleteAccount from '../components/Profile/DeleteAccount';


const ProfilePage = () => {
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <EditProfile /> 
          </Grid>
          <Grid item xs={12} md={6}>
            <EditPassword /> 
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Add content for lower left */}
          </Grid>
          <Grid item xs={12} md={6}>
            <DeleteAccount /> 
          </Grid>
        </Grid>
      </Container>
    );
  };

export default ProfilePage;
