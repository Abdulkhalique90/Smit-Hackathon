import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import AdminAuth from './AdminAuth';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Card,
  CardContent,
  IconButton,
  Switch,
  FormControlLabel,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  TrendingUp as TrendingUpIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

function AdminWebPanel() {
  const { user, logout } = useAuth();
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', role: 'user' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', role: 'admin' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', role: 'user' }
  ]);
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', price: 999, stock: 50, status: 'available' },
    { id: 2, name: 'Mouse', price: 25, stock: 100, status: 'available' },
    { id: 3, name: 'Keyboard', price: 75, stock: 0, status: 'out_of_stock' }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});

  if (!user) {
    return <AdminAuth />;
  }

  const handleStatusToggle = (type, id) => {
    if (type === 'user') {
      setUsers(users.map(user => 
        user.id === id 
          ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
          : user
      ));
    } else {
      setProducts(products.map(product => 
        product.id === id 
          ? { ...product, status: product.status === 'available' ? 'out_of_stock' : 'available' }
          : product
      ));
    }
  };

  const handleDelete = (type, id) => {
    if (type === 'user') {
      setUsers(users.filter(user => user.id !== id));
    } else {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  const handleAdd = (type) => {
    setDialogType(type);
    setSelectedItem(null);
    setFormData({});
    setOpenDialog(true);
  };

  const handleEdit = (type, item) => {
    setDialogType(type);
    setSelectedItem(item);
    setFormData(item);
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (dialogType === 'user') {
      if (selectedItem) {
        setUsers(users.map(user => user.id === selectedItem.id ? { ...user, ...formData } : user));
      } else {
        setUsers([...users, { id: Date.now(), ...formData }]);
      }
    } else {
      if (selectedItem) {
        setProducts(products.map(product => product.id === selectedItem.id ? { ...product, ...formData } : product));
      } else {
        setProducts([...products, { id: Date.now(), ...formData }]);
      }
    }
    setOpenDialog(false);
  };

  const renderDashboard = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h4">
              {users.length}
            </Typography>
            <PeopleIcon color="primary" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Products
            </Typography>
            <Typography variant="h4">
              {products.length}
            </Typography>
            <InventoryIcon color="primary" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Active Users
            </Typography>
            <Typography variant="h4">
              {users.filter(u => u.status === 'active').length}
            </Typography>
            <TrendingUpIcon color="primary" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Available Products
            </Typography>
            <Typography variant="h4">
              {products.filter(p => p.status === 'available').length}
            </Typography>
            <ShoppingCartIcon color="primary" />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderUsersTable = () => (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Users Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleAdd('user')}
        >
          Add User
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={user.role} 
                    color={user.role === 'admin' ? 'error' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={user.status === 'active'}
                        onChange={() => handleStatusToggle('user', user.id)}
                        color="primary"
                      />
                    }
                    label={user.status}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit('user', user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete('user', user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderProductsTable = () => (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Products Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleAdd('product')}
        >
          Add Product
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Chip 
                    label={product.status} 
                    color={product.status === 'available' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit('product', product)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete('product', product.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderDialog = () => (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
      <DialogTitle>
        {selectedItem ? `Edit ${dialogType}` : `Add ${dialogType}`}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {dialogType === 'user' ? (
            <>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Role"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                sx={{ mb: 2 }}
              />
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Stock"
                type="number"
                value={formData.stock || ''}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                sx={{ mb: 2 }}
              />
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Web Panel
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            marginTop: '64px'
          },
        }}
      >
        <List>
          <ListItem button onClick={() => setSelectedTab('dashboard')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setSelectedTab('users')}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button onClick={() => setSelectedTab('products')}>
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setSelectedTab('settings')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
        <Container maxWidth="xl">
          {selectedTab === 'dashboard' && renderDashboard()}
          {selectedTab === 'users' && renderUsersTable()}
          {selectedTab === 'products' && renderProductsTable()}
          {selectedTab === 'settings' && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6">Settings</Typography>
              <Typography>Settings panel coming soon...</Typography>
            </Paper>
          )}
        </Container>
      </Box>
      
      {renderDialog()}
    </Box>
  );
}

export default AdminWebPanel; 