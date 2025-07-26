import React, { useState } from 'react';
import { Box, Button, Container, Typography, Paper, Tabs, Tab } from '@mui/material';
import AdminAppPanel from './AdminAppPanel';
import UserApp from './UserApp';

function MainApp() {
  const [currentMode, setCurrentMode] = useState('user'); // 'user' or 'admin'

  return (
    <Box sx={{ minHeight: '100vh', background: '#f5f6fa' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }} elevation={2}>
          <Typography variant="h4" gutterBottom align="center">
            Saylani SMIT Application
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" gutterBottom>
            Choose your interface
          </Typography>
          
          <Tabs 
            value={currentMode === 'user' ? 0 : 1} 
            onChange={(_, v) => setCurrentMode(v === 0 ? 'user' : 'admin')} 
            centered 
            sx={{ mt: 2 }}
          >
            <Tab label="User Interface" />
            <Tab label="Admin Panel" />
          </Tabs>
        </Paper>

        {currentMode === 'user' ? <UserApp /> : <AdminAppPanel />}
      </Container>
    </Box>
  );
}

export default MainApp; 