import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import DataGridTable from '../../Components/RegisterContact';
import { Button, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import {  Modal, ModalDialog } from '@mui/joy';
import { AuthContext } from '../../Contexts/AuthContext';
import api from '../../Services/api';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {

  const {user, setUser, loading, setContacts} = React.useContext(AuthContext)

  const navigate = useNavigate()

  const [open, setOpen] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataRegister = {
      name: data.get('name'),
      email: data.get('email'),
      age: Number(data.get('age')),
      phone: data.get('phone'),
    };
    
    await api.post('/contacts', dataRegister)
      .then((response)=> { 
        if(response.status === 201) {
          setContacts((prev) => [...prev, response.data])

          setOpenModal(false)
        }
      })
  }

  const logout = () => {
    setUser('')
    localStorage.removeItem('@token')
    localStorage.removeItem('@user')
    navigate('/signin', {replace: true})
  }
  
  React.useEffect( ()=> {

    async function getContacts() {
      await api.get('/contacts').then((response) => {
        setContacts(response.data)
    })} 
    getContacts()
  },[setContacts, setUser] )


  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
    { user && (

    <>
    
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
            </ListItemButton>
            
            <ListItemButton>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" onClick={logout}/>
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth='lg' minWidth='sm' sx={{ mt: 4, mb: 4 }}>
            <Grid spacing={3} sx={{display: 'flex', flexDirection: 'column'}}>
              <Grid item xs={10} md={12} lg={9}>
                
                <DataGridTable/>
                
              </Grid>
              <span style={{marginTop: 15, marginLeft: 15, fontStyle:'italic', fontSize: 13}}>** To edit a contact: double-clicking a cell, write a new word and press Enter. Finally press Edit.  </span>
              <Button
                type="button"                
                variant="contained"
                onClick={()=> setOpenModal(true)}
                sx={{marginLeft: 'auto', marginRight: 1 , mt: 3, mb: 2, backgroundColor: '#2d3a5d', width: 150, height: 40, "&:hover": {backgroundColor: '#4b609b'} }}
              >
                New Contact
              </Button> 
            </Grid>
          </Container> 
          
        </Box>
      </Box>
      
    </ThemeProvider>
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ maxWidth: 500 }}
      >
        <Typography id="basic-modal-dialog-title" component="h2" sx={{fontWeight: '600'}}>
          Register contact
        </Typography>
        <Box component="form" noValidate onSubmit={handleRegister} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
              />              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="age"
                label="Age"
                type="number"
                id="age"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="text"
                id="phone"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#2d3a5d', height: 40, "&:hover": {backgroundColor: '#4b609b'} }}
              >
                Register
              </Button>
              </Box>
      </ModalDialog>
    </Modal>
    </>
    )}
    </>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}