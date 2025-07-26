import React from 'react';
import { useAuth } from './AuthContext';
import AdminAuth from './AdminAuth';
import RealtimeProductCRUD from './RealtimeProductCRUD';

function AdminDashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return <AdminAuth />;
  }

  return (
    <div>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '15px', 
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h2>Admin Dashboard</h2>
          <p>Welcome, {user.email}</p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
      
      <div>
        <h3>Product Management</h3>
        <RealtimeProductCRUD />
      </div>
    </div>
  );
}

export default AdminDashboard; 