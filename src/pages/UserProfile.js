import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const defaultTheme = createTheme();

export default function ProfilePage({ profile }) {
  const { id } = useParams();
  console.log('Profile prop in ProfilePage:', profile);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({ ...profile });
  const [userProfile, setUserProfile] = useState(profile);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // State variables for all fields
  const [bio, setBio] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState({});
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [website, setWebsite] = useState('');
  const [saveError, setSaveError] = useState(null);

  const handleSaveClick = async () => {
    try {
      // Send updated profile data to the server
      await axios.put(`/users/${id}/profile`, {
        bio,
        dateOfBirth,
        gender,
        socialMediaLinks,
        address,
        profilePicture,
        website,
      });
      // Disable editing mode after successful update
      setEditedProfile(false);
      // Update the userProfile state with the new data
      setUserProfile({
        ...userProfile,
        bio,
        dateOfBirth,
        gender,
        socialMediaLinks,
        address,
        profilePicture,
        website,
      });
    } catch (error) {
      console.error(error);
      setSaveError('Error updating profile.');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset editedProfile to the current profile data to discard changes
    setEditedProfile({ ...profile });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="#">
                  Home
                </Link>
                <Link color="inherit" href="#">
                  User
                </Link>
                <Typography color="textPrimary">User Profile</Typography>
              </Breadcrumbs>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Grid container justifyContent="center">
                <Avatar
                  alt="User Avatar"
                  src={
                    isEditing
                      ? editedProfile.profilePicture
                      : profile.profilePicture
                  }
                  sx={{ width: 150, height: 150 }}
                />
              </Grid>
              <Grid>
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  align="center"
                >
                  {isEditing ? (
                    <TextField
                      name="jobTitle"
                      value={editedProfile.jobTitle}
                      onChange={handleInputChange}
                    />
                  ) : (
                    profile.jobTitle || 'empty'
                  )}
                </Typography>
              </Grid>
              <Grid>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  align="center"
                >
                  {isEditing ? (
                    <TextField
                      name="location"
                      value={editedProfile.location}
                      onChange={handleInputChange}
                    />
                  ) : (
                    profile.location || 'empty'
                  )}
                </Typography>
              </Grid>
              <Grid container justifyContent="center" mt={2}>
                {isEditing ? (
                  <>
                    <IconButton onClick={handleSaveClick} color="primary">
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelClick} color="secondary">
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
                    <Button variant="outlined" color="primary" sx={{ ml: 1 }}>
                      Message
                    </Button>
                  </>
                )}
              </Grid>
            </Paper>
            <Paper elevation={3} style={{ marginTop: '16px', padding: '16px' }}>
              <Typography variant="subtitle1" color="textSecondary">
                Social Media Links
              </Typography>
            </Paper>
          </Grid>
          <Grid item lg={8}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Username</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profile.username || 'empty'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Email</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {profile.email || 'empty'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">First Name</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="firstName"
                        value={editedProfile.firstName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.firstName || 'empty'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Last Name</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="lastName"
                        value={editedProfile.lastName}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.lastName
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Bio</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="bio"
                        value={editedProfile.bio}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.bio || 'empty'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Date of Birth</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="dateOfBirth"
                        value={editedProfile.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.dateOfBirth || 'empty'
                    )}
                  </Typography>
                </Grid>
                {/* Add fields from UserProfile model */}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Gender</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="gender"
                        value={editedProfile.gender}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.gender || 'empty'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Address</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="address"
                        value={editedProfile.address}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.address || 'empty'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Profile Picture</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="profilePicture"
                        value={editedProfile.profilePicture}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.profilePicture || 'empty'
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">Website</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {isEditing ? (
                      <TextField
                        name="website"
                        value={editedProfile.website}
                        onChange={handleInputChange}
                      />
                    ) : (
                      profile.website || 'empty'
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} style={{ marginTop: '16px', padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Recent Job Postings
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
