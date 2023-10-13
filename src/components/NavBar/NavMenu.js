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


export function PrimarySearchAppBar({ profile, isLoggedIn }) {
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

    const { id: userId } = profile; // Extract the userId from profile
    const menuId = 'primary-search-account-menu';

    const menuItems = [
        { key: 'home', label: 'Home', link: '/' },
        { key: 'addJob', label: 'Add Job', link: '/postjob' },
        { key: 'profile', label: 'Profile', link: `/profile/${userId}` },
        { key: 'signIn', label: 'Sign In', link: '/signin' },
        { key: 'createUser', label: 'Create User', link: '/create' },
        { key: 'signOut', label: 'Sign Out', component: <SignOutButton /> },
    ];
    const menuItemsJSX = menuItems.map((item) => (
        <MenuItem key={item.key} component={Link} to={item.link} onClick={handleMenuClose}>
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
            <AppBar position="static">
                <Toolbar>
                    {/* Application title */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        MahiBoard
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {/* Desktop menu (notifications, mail, user account) */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

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
