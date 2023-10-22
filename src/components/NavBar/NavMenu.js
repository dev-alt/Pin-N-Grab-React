import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Dialog,
  Grow,
  Tooltip,
  Button,
  Link,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import { Link } from 'react-router-dom';
import SignOutButton from '../Member/SignOut';
import NotificationsMenu from './NotificaitonsMenu.js';
import MailMenu from './MailMenu';
import { useAuth } from '../../AuthContext';
import CreateJob from '../../pages/PostJob';
import './nav.css';
import PushPinIcon from '@mui/icons-material/PushPin';
import Logo from './Logo';

export function PrimarySearchAppBar() {
  const { profile } = useAuth(); // Removed isLoggedIn
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Check if the user account menu is open
  const isMenuOpen = Boolean(anchorEl);

  // Function to open the user account menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close both menus
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const userId = profile?.User?.id || 'user';
  const menuId = 'primary-search-account-menu';

  const menuItems = [
    { key: 'home', label: 'Home', link: '/' },
    { key: 'profile', label: 'Profile', link: `/profile/${userId}` },
    // { key: 'signIn', label: 'Sign In', link: '/signin' },
    // {
    //   key: 'createUser',
    //   label: 'Create User',
    //   link: '/create',
    // },
    {
      key: 'signOut',
      label: 'Sign Out',
      component: <SignOutButton />,
    },
  ];

  const menuItemsJSX = menuItems.map((item) => (
    <MenuItem
      key={item.key}
      onClick={() => {
        if (item.key === 'signOut') {
          // Close the menu and handle sign-out action in the SignOutButton component
          handleMenuClose();
        }
      }}
      component={item.key !== 'signOut' ? Link : undefined}
      to={item.key !== 'signOut' ? item.link : undefined}
    >
      {item.component || item.label}
    </MenuItem>
  ));

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {menuItemsJSX}
    </Menu>
  );

  const [isCreateJobOpen, setIsCreateJobOpen] = useState(false);
  const closeCreateJobDialog = () => {
    setIsCreateJobOpen(false);
  };
  const openCreateJobDialog = () => {
    setIsCreateJobOpen(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ boxShadow: 'none' }}>
          <Toolbar>
            {/* Application title */}

            <Link href="/" color="inherit" underline="none">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Logo width="2rem" />
                <Typography
                  variant="h4"
                  noWrap
                  component="div"
                  sx={{
                    display: { sm: 'block' },
                    fontFamily: 'Tilt Neon',
                    fontSize: { xs: '0', sm: '1.5rem', md: '2rem' },
                    '& a': {
                      textDecoration: 'none', // Remove text decoration
                      color: 'inherit', // Inherit the color from the parent (normal color)
                    },
                    '& a:active': {
                      color: 'rgba(20, 8, 14, 1)', // Define color for the active state
                    },
                    paddingLeft: '5px',
                  }}
                >
                  Pin'n Grab
                </Typography>
              </Box>
            </Link>

            <Box sx={{ flexGrow: 1 }} />
            {/* Desktop menu (notifications, mail, user account) */}
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Tooltip title="Pin a job">
                <Button
                  startIcon={
                    <PushPinIcon
                      sx={{ fontSize: { xs: '12px', sm: '20px' } }}
                    />
                  }
                  sx={{
                    color: '#15abab',
                    fontSize: { xs: '0px', sm: '20px' },
                    fontFamily: 'Lato Black',
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                  variant="outlined"
                  className="blinking"
                  onClick={openCreateJobDialog}
                >
                  Pin a Job
                </Button>
              </Tooltip>

              <NotificationsMenu />
              <MailMenu />
              <IconButton
                size="large"
                aria-label="account of the current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
      <Dialog
        open={isCreateJobOpen}
        onClose={closeCreateJobDialog}
        TransitionComponent={Grow}
        transitionDuration={500}
        maxWidth="sm"
        fullWidth
      >
        <CreateJob onClose={closeCreateJobDialog} />
      </Dialog>
    </>
  );
}
