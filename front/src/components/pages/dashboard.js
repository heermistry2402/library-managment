import { useEffect, useState } from 'react'; 
import axios from 'axios'; 
import { AppBar, Box, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Collapse, Grid, Paper, Button } from '@mui/material';
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
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Admin icon
import './css/navbar.css';
import './css/Dashboard.css'; 
import adminImage from 'file:///D:/react%20project/admin/frotend/p1.jpeg'; 

const drawerWidth = 240;

const Navbar = () => {
  const [openAddBookMenu, setOpenAddBookMenu] = useState(false);
  const [openSettingsMenu, setOpenSettingsMenu] = useState(false);
  const [totalBooks, setTotalBooks] = useState(0); 
  const [username, setUsername] = useState('Admin'); // Default username

  const handleAddBookClick = () => {
    setOpenAddBookMenu(!openAddBookMenu);
  };

  const handleSettingsMenuClick = () => {
    setOpenSettingsMenu(!openSettingsMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // Clear username from local storage
    localStorage.removeItem('token'); // Optionally clear token
    console.log("Logout clicked");
  };

  useEffect(() => {
    const fetchTotalBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/total-books');
        setTotalBooks(response.data.totalBooks);
      } catch (error) {
        console.error('Error fetching total books:', error.message);
      }
    };

    fetchTotalBooks();

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername); // Set username from local storage
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#6d1b7b' }} color="primary">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountCircleIcon sx={{ mr: 1 }} /> {/* Admin icon */}
            <Typography variant="subtitle1" color="inherit">
              Welcome, {username}!
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer sx={{ width: drawerWidth, flexShrink: 0, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#f5f5f5' } }} variant="permanent" anchor="left">
        <Toolbar />
        <Box sx={{ textAlign: 'center', p: 2 }}>
          <img src={adminImage} alt="Admin" className="img-fluid rounded-circle admin-img" />
          <Typography variant="h6" className="admin-name">{username}</Typography>
        </Box>
        <Box sx={{ overflowY: 'auto', height: 'calc(100vh - 100px)' }}>
          <List>
            <ListItem button component={NavLink} to="/dashboard" style={({ isActive }) => ({ backgroundColor: isActive ? '#6d1b7b' : '' })}>
              <DashboardIcon sx={{ mr: 2 }} />
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={handleAddBookClick}>
              <LibraryBooksIcon sx={{ mr: 2 }} />
              <ListItemText primary="Manage Books" />
              {openAddBookMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openAddBookMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={NavLink} to="/add-book" style={({ isActive }) => ({ backgroundColor: isActive ? '#6d1b7b' : '' })}>
                  <BookIcon sx={{ mr: 2 }} />
                  <ListItemText primary="Add Book" inset />
                </ListItem>
                <ListItem button component={NavLink} to="/manage-book" style={({ isActive }) => ({ backgroundColor: isActive ? '#6d1b7b' : '' })}>
                  <ManageSearchIcon sx={{ mr: 2 }} />
                  <ListItemText primary="Manage Book" inset />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleSettingsMenuClick}>
              <SettingsIcon sx={{ mr: 2 }} />
              <ListItemText primary="Settings" />
              {openSettingsMenu ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openSettingsMenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={NavLink} to="/AdminProfile" style={({ isActive }) => ({ backgroundColor: isActive ? '#6d1b7b' : '' })}>
                  <EditIcon sx={{ mr: 2 }} />
                  <ListItemText primary="Edit Profile" inset />
                </ListItem>
                <ListItem button component={NavLink} to="/ForgotPassword" style={({ isActive }) => ({ backgroundColor: isActive ? '#6d1b7b' : '' })}>
                  <LockIcon sx={{ mr: 2 }} />
                  <ListItemText primary="Change Password" inset />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={handleLogout} component={NavLink} to="/Logout" style={({ isActive }) => ({ backgroundColor: isActive ? '#6d1b7b' : '' })}>
              <LogoutIcon sx={{ mr: 2 }} />
              <ListItemText primary="Log Out" inset />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>Welcome to the Library Management System</Typography>
          </Grid>

          {/* Total Books Card */}
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} sx={{ bgcolor: '#6d1b7b', color: 'white', padding: 2, textAlign: 'center', borderRadius: 2 }}>
              <NavLink to="/manage-book" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6">Total Books</Typography>
                <Typography variant="h4">{totalBooks}</Typography>
              </NavLink>
            </Paper>
          </Grid>

          {/* Add Book Button */}
          <Grid item xs={12} sm={6} md={4}> {/* xs={12} ensures full width on small screens */}
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
              <NavLink to="/add-book" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="contained" color="primary">
                  Add Book
                </Button>
              </NavLink>
            </Paper>
          </Grid>

          {/* Manage Book Button */}
          <Grid item xs={12} sm={6} md={4}> {/* xs={12} ensures full width on small screens */}
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', borderRadius: 2 }}>
              <NavLink to="/manage-book" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button variant="contained" color="secondary">
                  Manage Books
                </Button>
              </NavLink>
            </Paper>
          </Grid>
     
        </Grid>
      </Box>
    </Box>
  );
};

export default Navbar;
