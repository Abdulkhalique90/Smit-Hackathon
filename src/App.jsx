import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Button, Container, Typography, AppBar, Toolbar } from '@mui/material';
import AdminPanel from './components/AdminPanel';
import MainApp from './components/MainApp';
import { AuthProvider } from './components/AuthContext';
import "./App.css";
import logo1 from "./assets/saylani welfare.jpg";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <MainApp />
          <Routes>
            <Route path="/" element={<FirstPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function FirstPage() {
  return (
    <div>
      <h2 style={{ fontSize: 66 + "px", fontWeight: "lighter" }}>
        Hi World
      </h2>
      <h3 style={{ fontSize: 66 + "px", fontWeight: "lighter" }}>Welcome to Saylany SMIT</h3>
      <h4>here</h4>
      <h5>to my</h5>
      <h6>website</h6>
      <p>This is my first React app</p>
      <img src={logo1} alt="Logo" style={{ width: '200px', height: 'auto' }} />
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary">
          Click me
        </Button>
      </Box>
    </div>
  );
}

export default App;