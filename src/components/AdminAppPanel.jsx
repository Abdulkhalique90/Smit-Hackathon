import React, { useState } from 'react';
import {
  Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, Chip, AppBar, Toolbar
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';

const initialAppointments = [
  { id: 1, name: 'Ali', phone: '1234567890', reason: 'Consultation', date: '2024-06-01', time: '10:00', status: 'pending' },
  { id: 2, name: 'Sara', phone: '0987654321', reason: 'Follow-up', date: '2024-06-02', time: '11:00', status: 'approved' },
  { id: 3, name: 'Ahmed', phone: '5555555555', reason: 'Checkup', date: '2024-06-03', time: '12:00', status: 'rejected' }
];

const initialHelpRequests = [
  { id: 1, name: 'Fatima', phone: '2223334444', type: 'Medical', description: 'Need urgent help', status: 'pending' },
  { id: 2, name: 'Usman', phone: '3334445555', type: 'Financial', description: 'Request for funds', status: 'approved' },
  { id: 3, name: 'Ayesha', phone: '4445556666', type: 'Other', description: 'General inquiry', status: 'rejected' }
];

function AdminAppPanel() {
  // Login state
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Panel state
  const [tab, setTab] = useState(0);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [helpRequests, setHelpRequests] = useState(initialHelpRequests);

  // Login handler (demo: username=admin, password=admin123)
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  // Status actions
  const handleStatusChange = (type, id, newStatus) => {
    if (type === 'appointment') {
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } else {
      setHelpRequests(helpRequests.map(r => r.id === id ? { ...r, status: newStatus } : r));
    }
  };

  // Dashboard counts
  const totalAppointments = appointments.length;
  const totalHelpRequests = helpRequests.length;
  const countStatus = (arr, status) => arr.filter(x => x.status === status).length;

  if (!loggedIn) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
        <Paper sx={{ p: 4, minWidth: 350 }} elevation={3}>
          <Typography variant="h5" gutterBottom>Admin Login</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            {loginError && <Typography color="error" sx={{ mt: 1 }}>{loginError}</Typography>}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
          </form>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Admin Dashboard</Typography>
          <Button color="inherit" onClick={() => setLoggedIn(false)}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {/* Dashboard Cards */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Total Appointments</Typography>
                <Typography variant="h4">{totalAppointments}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Total Help Requests</Typography>
                <Typography variant="h4">{totalHelpRequests}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Approved</Typography>
                <Typography variant="h4">{countStatus(appointments, 'approved') + countStatus(helpRequests, 'approved')}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>Pending / Rejected</Typography>
                <Typography variant="h6">Pending: {countStatus(appointments, 'pending') + countStatus(helpRequests, 'pending')}</Typography>
                <Typography variant="h6">Rejected: {countStatus(appointments, 'rejected') + countStatus(helpRequests, 'rejected')}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs for Appointments/Help Requests */}
        <Paper sx={{ mb: 3 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} indicatorColor="primary" textColor="primary" centered>
            <Tab label="Appointments" />
            <Tab label="Help Requests" />
          </Tabs>
        </Paper>

        {/* Appointments Table */}
        {tab === 0 && (
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map(a => (
                  <TableRow key={a.id}>
                    <TableCell>{a.name}</TableCell>
                    <TableCell>{a.phone}</TableCell>
                    <TableCell>{a.reason}</TableCell>
                    <TableCell>{a.date}</TableCell>
                    <TableCell>{a.time}</TableCell>
                    <TableCell>
                      <Chip label={a.status} color={a.status === 'approved' ? 'success' : a.status === 'pending' ? 'warning' : 'error'} />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="success"
                        startIcon={<Check />}
                        disabled={a.status === 'approved'}
                        onClick={() => handleStatusChange('appointment', a.id, 'approved')}
                      >Approve</Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Close />}
                        disabled={a.status === 'rejected'}
                        onClick={() => handleStatusChange('appointment', a.id, 'rejected')}
                      >Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Help Requests Table */}
        {tab === 1 && (
          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {helpRequests.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.phone}</TableCell>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>{r.description}</TableCell>
                    <TableCell>
                      <Chip label={r.status} color={r.status === 'approved' ? 'success' : r.status === 'pending' ? 'warning' : 'error'} />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="success"
                        startIcon={<Check />}
                        disabled={r.status === 'approved'}
                        onClick={() => handleStatusChange('help', r.id, 'approved')}
                      >Approve</Button>
                      <Button
                        size="small"
                        color="error"
                        startIcon={<Close />}
                        disabled={r.status === 'rejected'}
                        onClick={() => handleStatusChange('help', r.id, 'rejected')}
                      >Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
}

export default AdminAppPanel; 