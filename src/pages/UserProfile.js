import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate, useParams } from 'react-router-dom';

const defaultTheme = createTheme();

export function Profile({ profile }) {
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState(profile);
  const [editing, setEditing] = useState(false);

  // State variables for all fields
  const [bio, setBio] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [interests, setInterests] = useState('');
  const [socialMediaLinks, setSocialMediaLinks] = useState({});
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [website, setWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [saveError, setSaveError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setUserProfile(profile);
  }, [profile]);

  const handleEdit = () => {
    setEditing(true);
    setBio(userProfile.bio || '');
    setDateOfBirth(userProfile.dateOfBirth || '');
    setGender(userProfile.gender || '');
    setInterests(userProfile.interests || '');
    setSocialMediaLinks(userProfile.socialMediaLinks || {});
    setAddress(userProfile.address || '');
    setProfilePicture(userProfile.profilePicture || '');
    setWebsite(userProfile.website || '');
    setContactEmail(userProfile.contactEmail || '');
    setContactPhone(userProfile.contactPhone || '');
  };

  const handleSave = async () => {
    try {
      // Send updated profile data to the server
      await axios.put(`/users/${id}/profile`, {
        bio,
        dateOfBirth,
        gender,
        interests,
        socialMediaLinks,
        address,
        profilePicture,
        website,
        contactEmail,
        contactPhone,
      });
      // Disable editing mode after successful update
      setEditing(false);
          // Update the userProfile state with the new data
    setUserProfile({
      ...userProfile,
      bio,
      dateOfBirth,
      gender,
      interests,
      socialMediaLinks,
      address,
      profilePicture,
      website,
      contactEmail,
      contactPhone,
    });

    } catch (error) {
      console.error(error);
      setSaveError("Error updating profile.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Profile
            </Typography>

            {editing ? (
              // Editing mode
              <form>
                {/* Bio */}
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                {/* Date of Birth */}
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                {/* Gender */}
                <TextField
                  fullWidth
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
                {/* Interests */}
                <TextField
                  fullWidth
                  label="Interests"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                />
                {/* Social Media Links */}
                <TextField
                  fullWidth
                  label="Social Media Links"
                  value={socialMediaLinks}
                  onChange={(e) => setSocialMediaLinks(e.target.value)}
                />
                {/* Address */}
                <TextField
                  fullWidth
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {/* Profile Picture */}
                <TextField
                  fullWidth
                  label="Profile Picture"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                />
                {/* Website */}
                <TextField
                  fullWidth
                  label="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                {/* Contact Email */}
                <TextField
                  fullWidth
                  label="Contact Email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
                {/* Contact Phone */}
                <TextField
                  fullWidth
                  label="Contact Phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />

                <Button onClick={handleSave} variant="contained" color="primary">
                  Save
                </Button>
              </form>
            ) : (
              // View mode
              <TableContainer component={Paper}>
                <Table>

                  <TableBody>
                    <TableRow>
                      <TableCell>Bio</TableCell>
                      <TableCell>{userProfile.bio || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell>{userProfile.dateOfBirth || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gender</TableCell>
                      <TableCell>{userProfile.gender || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Interests</TableCell>
                      <TableCell>{userProfile.interests || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Social Media Links</TableCell>
                      <TableCell>{JSON.stringify(userProfile.socialMediaLinks) || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell>{userProfile.address || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Profile Picture</TableCell>
                      <TableCell>{userProfile.profilePicture || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Website</TableCell>
                      <TableCell>{userProfile.website || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Contact Email</TableCell>
                      <TableCell>{userProfile.contactEmail || '-'}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Contact Phone</TableCell>
                      <TableCell>{userProfile.contactPhone || '-'}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Button onClick={handleEdit} variant="outlined" color="primary">
              {editing ? 'Cancel' : 'Edit'}
            </Button>
            {saveError && <Typography variant="body2" color="error">{saveError}</Typography>}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
