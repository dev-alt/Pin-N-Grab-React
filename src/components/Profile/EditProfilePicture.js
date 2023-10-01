import React from 'react';

const EditProfilePicture = () => {
  const handleProfilePictureChange = (event) => {
    // Handle the profile picture change here
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
      />
      {/* Render the current profile picture */}
      <img src="path_to_current_profile_picture" alt="Profile" />
    </div>
  );
};

export default EditProfilePicture;