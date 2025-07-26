import React, { useState } from 'react';
import {
  Box, Button, Card, CardContent, Container, TextField, Typography, 
  Paper, Tabs, Tab, Avatar, List, ListItem, ListItemText, ListItemIcon,
  BottomNavigation, BottomNavigationAction, Dialog, DialogTitle, 
  DialogContent, DialogActions, Switch, FormControlLabel, Divider, Grid
} from '@mui/material';
import {
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  CalendarToday as CalendarIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

function UserApp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, State'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfileData, setTempProfileData] = useState({});
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    reason: '',
    date: '',
    time: '',
    description: ''
  });
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [helpForm, setHelpForm] = useState({
    type: '',
    description: '',
    urgency: 'medium'
  });

  // Auth handlers
  const handleAuth = (e) => {
    e.preventDefault();
    if (authMode === 'signup' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoggedIn(true);
    setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  };

  // Profile handlers
  const handleEditProfile = () => {
    setTempProfileData({ ...profileData });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    setProfileData(tempProfileData);
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
  };

  // Appointment handlers
  const handleSubmitAppointment = () => {
    alert('Appointment submitted successfully!');
    setShowAppointmentDialog(false);
    setAppointmentForm({ reason: '', date: '', time: '', description: '' });
  };

  // Help request handlers
  const handleSubmitHelp = () => {
    alert('Help request submitted successfully!');
    setShowHelpDialog(false);
    setHelpForm({ type: '', description: '', urgency: 'medium' });
  };

  if (!loggedIn) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4 }} elevation={3}>
            <Typography variant="h4" gutterBottom align="center">
              Welcome to Saylani SMIT
            </Typography>
            <Typography variant="body1" gutterBottom align="center" color="textSecondary">
              {authMode === 'login' ? 'Sign in to your account' : 'Create your account'}
            </Typography>
            
            <Tabs value={authMode === 'login' ? 0 : 1} onChange={(_, v) => setAuthMode(v === 0 ? 'login' : 'signup')} centered sx={{ mb: 3 }}>
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>

            <form onSubmit={handleAuth}>
              {authMode === 'signup' && (
                <TextField
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                />
              )}
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              {authMode === 'signup' && (
                <TextField
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                />
              )}
              <TextField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
                margin="normal"
                required
              />
              {authMode === 'signup' && (
                <TextField
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  fullWidth
                  margin="normal"
                  required
                />
              )}
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                {authMode === 'login' ? 'Login' : 'Sign Up'}
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    );
  }

  const renderHome = () => (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Welcome, {profileData.name}!</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Book Appointment</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Schedule a consultation or follow-up appointment
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<CalendarIcon />}
                onClick={() => setShowAppointmentDialog(true)}
                fullWidth
                sx={{ mt: 2 }}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Request Help</Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Submit a help request for medical, financial, or other assistance
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<HelpIcon />}
                onClick={() => setShowHelpDialog(true)}
                fullWidth
                sx={{ mt: 2 }}
              >
                Request Help
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );

  const renderProfile = () => (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Profile</Typography>
      
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mr: 2 }}>{profileData.name.charAt(0)}</Avatar>
            <Box>
              <Typography variant="h6">{profileData.name}</Typography>
              <Typography color="textSecondary">{profileData.email}</Typography>
            </Box>
            {!isEditingProfile && (
              <Button startIcon={<EditIcon />} onClick={handleEditProfile} sx={{ ml: 'auto' }}>
                Edit
              </Button>
            )}
          </Box>

          <List>
            <ListItem>
              <ListItemIcon><EmailIcon /></ListItemIcon>
              <ListItemText 
                primary="Email" 
                secondary={isEditingProfile ? (
                  <TextField
                    value={tempProfileData.email}
                    onChange={(e) => setTempProfileData({ ...tempProfileData, email: e.target.value })}
                    fullWidth
                    size="small"
                  />
                ) : profileData.email}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><PhoneIcon /></ListItemIcon>
              <ListItemText 
                primary="Phone" 
                secondary={isEditingProfile ? (
                  <TextField
                    value={tempProfileData.phone}
                    onChange={(e) => setTempProfileData({ ...tempProfileData, phone: e.target.value })}
                    fullWidth
                    size="small"
                  />
                ) : profileData.phone}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon><LocationIcon /></ListItemIcon>
              <ListItemText 
                primary="Address" 
                secondary={isEditingProfile ? (
                  <TextField
                    value={tempProfileData.address}
                    onChange={(e) => setTempProfileData({ ...tempProfileData, address: e.target.value })}
                    fullWidth
                    size="small"
                  />
                ) : profileData.address}
              />
            </ListItem>
          </List>

          {isEditingProfile && (
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveProfile}>
                Save
              </Button>
              <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleCancelEdit}>
                Cancel
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );

  const renderSettings = () => (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>Settings</Typography>
      
      <Card>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary="Push Notifications" secondary="Receive notifications about appointments and updates" />
              <Switch defaultChecked />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Email Notifications" secondary="Receive email updates" />
              <Switch defaultChecked />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="SMS Notifications" secondary="Receive SMS updates" />
              <Switch />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Dark Mode" secondary="Use dark theme" />
              <Switch />
            </ListItem>
          </List>
          
          <Box sx={{ mt: 3 }}>
            <Button variant="outlined" color="error" fullWidth onClick={() => setLoggedIn(false)}>
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );

  return (
    <Box sx={{ pb: 7 }}>
      {currentTab === 0 && renderHome()}
      {currentTab === 1 && renderProfile()}
      {currentTab === 2 && renderSettings()}
      
      <BottomNavigation
        value={currentTab}
        onChange={(_, newValue) => setCurrentTab(newValue)}
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>

      {/* Appointment Dialog */}
      <Dialog open={showAppointmentDialog} onClose={() => setShowAppointmentDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book Appointment</DialogTitle>
        <DialogContent>
          <TextField
            label="Reason for Visit"
            value={appointmentForm.reason}
            onChange={(e) => setAppointmentForm({ ...appointmentForm, reason: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date"
            type="date"
            value={appointmentForm.date}
            onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            type="time"
            value={appointmentForm.time}
            onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
            fullWidth
            margin="normal"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            value={appointmentForm.description}
            onChange={(e) => setAppointmentForm({ ...appointmentForm, description: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAppointmentDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitAppointment} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Help Request Dialog */}
      <Dialog open={showHelpDialog} onClose={() => setShowHelpDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Request Help</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Type of Help"
            value={helpForm.type}
            onChange={(e) => setHelpForm({ ...helpForm, type: e.target.value })}
            fullWidth
            margin="normal"
            required
          >
            <option value="medical">Medical</option>
            <option value="financial">Financial</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </TextField>
          <TextField
            label="Description"
            multiline
            rows={4}
            value={helpForm.description}
            onChange={(e) => setHelpForm({ ...helpForm, description: e.target.value })}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            select
            label="Urgency Level"
            value={helpForm.urgency}
            onChange={(e) => setHelpForm({ ...helpForm, urgency: e.target.value })}
            fullWidth
            margin="normal"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowHelpDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitHelp} variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UserApp; 