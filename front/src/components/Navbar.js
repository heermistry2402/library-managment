import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Collapse, IconButton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import BookIcon from '@mui/icons-material/Book';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import LogoutIcon from '@mui/icons-material/Logout'; // Logout icon
import './pages/css/navbar.css'; // Custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import adminImage from 'file:///D:/react%20project/admin/frotend/p1.jpeg'; // Admin image
import AccountCircleIcon from '@mui/icons-material/AccountCircle';  // Admin icon
const drawerWidth = 240;

const Navbar = () => {
  const [openAddBookMenu, setOpenAddBookMenu] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [openSettingsMenu, setOpenSettingsMenu] = useState(false);
  const [username, setUsername] = useState('Admin'); // Default username

  useEffect(() => {
    // Fetch the username from local storage (assuming it's stored during login)
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleAddBookClick = () => {
    setOpenAddBookMenu(!openAddBookMenu);
  };

  const handleSettingsMenuClick = () => {
    setOpenSettingsMenu(!openSettingsMenu);
  };

  const handleLogout = () => {
    // Clear user session or token here
    localStorage.removeItem('username');
    console.log("Logout clicked");
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: '#6d1b7b',
        }}
        color="primary"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>

          {/* Welcome message with username and admin icon */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon sx={{ mr: 1 }} /> {/* Admin icon */}
            <Typography variant="subtitle1" color="inherit">
              Welcome, {username}!
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        {/* Admin Image at the Top */}
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <img
            src={adminImage}
            alt="Admin"
            className="img-fluid rounded-circle admin-img"
          />
          <Typography variant="h6" className="admin-name">
            {username}
          </Typography>
        </Box>

        {/* Content with Scrollbar */}
        <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}>
          <List>
            {/* Dashboard */}
            <ListItem
              button
              component={NavLink}
              to="/dashboard"
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#6d1b7b' : '',
              })}
            >
              <DashboardIcon sx={{ mr: 2 }} />
              <ListItemText primary="Dashboard" />
            </ListItem>

            {/* Add Book with Submenu */}
            <ListItem button onClick={handleAddBookClick}>
              <LibraryBooksIcon sx={{ mr: 2 }} />
              <ListItemText primary="Add Book" />
              {openAddBookMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAddBookMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={NavLink}
                  to="/add-book"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#6d1b7b' : '',
                  })}
                >
                  <BookIcon sx={{ mr: 2 }} />
                  <ListItemText primary="Add Book" inset />
                </ListItem>
                <ListItem
                  button
                  component={NavLink}
                  to="/manage-book"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#6d1b7b' : '',
                  })}
                >
                  <ManageSearchIcon sx={{ mr: 2 }} />
                  <ListItemText primary="Manage Book" inset />
                </ListItem>
              </List>
            </Collapse>

            {/* Settings Menu with Submenu */}
            <ListItem button onClick={handleSettingsMenuClick}>
              <SettingsIcon sx={{ mr: 2 }} />
              <ListItemText primary="Settings" />
              {openSettingsMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSettingsMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  component={NavLink}
                  to="/AdminProfile"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#6d1b7b' : '',
                  })}
                >
                  <EditIcon sx={{ mr: 2 }} />
                  <ListItemText primary="Edit Profile" inset />
                </ListItem>
                <ListItem
                  button
                  component={NavLink}
                  to="/ForgotPassword"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? '#6d1b7b' : '',
                  })}
                >
                  <LockIcon sx={{ mr: 2 }} />
                  <ListItemText primary="Change Password" inset />
                </ListItem>
              </List>
            </Collapse>

            {/* Logout Menu Item */}
            <ListItem
              button
              component={NavLink}
              to="/Logout"
              onClick={handleLogout}
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#6d1b7b' : '',
              })}
            >
              <LogoutIcon sx={{ mr: 2 }} />
              <ListItemText primary="Log Out" inset />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content with Admin Dashboard */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {/* Admin Dashboard Content */}
      </Box>
    </Box>
  );
};

export default Navbar;
