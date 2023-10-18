import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import SignOutButton from '../Member/SignOut';
import NotificationsMenu from './NotificaitonsMenu.js';
import MailMenu from './MailMenu';
import { useAuth } from '../../AuthContext';

export function PrimarySearchAppBar() {
  const { profile, isLoggedIn } = useAuth();
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
    { key: 'signIn', label: 'Sign In', link: '/signin', show: !isLoggedIn }, // Add a 'show' property
    {
      key: 'createUser',
      label: 'Create User',
      link: '/create',
      show: !isLoggedIn,
    }, // Add a 'show' property
    {
      key: 'signOut',
      label: 'Sign Out',
      component: isLoggedIn && <SignOutButton />,
    },
  ];

  const menuItemsJSX = menuItems
    .filter((item) => !('show' in item) || item.show) // Filter items to remove those with 'show' set to false
    .map((item) => (
      <MenuItem
        key={item.key}
        component={Link}
        to={item.link}
        onClick={handleMenuClose}
      >
        {item.label}
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ boxShadow: 'none' }}>
        <Toolbar>
          {/* Application title */}
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              display: { sm: 'block' },
              fontFamily: 'Tilt Neon',
              fontSize: { xs: '1rem', md: '2rem' },
            }}
          >
            Pin'n Grab
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* Desktop menu (notifications, mail, user account) */}
          <Box sx={{ display: 'flex' }}>
            {isLoggedIn && <NotificationsMenu />}
            {isLoggedIn && <MailMenu />}
            {isLoggedIn && (
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
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
