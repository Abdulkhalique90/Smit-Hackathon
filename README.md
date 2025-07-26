# React Admin Panel

A comprehensive admin panel built with React and Material-UI for managing users and products.

## Features

### 🏠 Dashboard
- Overview statistics (Total Users, Products, Revenue, Orders)
- Recent activities feed
- Quick action buttons
- Responsive design with Material-UI components

### 👥 User Management
- **CRUD Operations**: Create, Read, Update, Delete users
- **User Roles**: Admin, Moderator, User
- **Status Management**: Active/Inactive users
- **Search Functionality**: Search by name or email
- **User Details**: Name, email, role, status, join date
- **Responsive Table**: Clean table layout with action buttons

### 📦 Product Management
- **CRUD Operations**: Create, Read, Update, Delete products
- **Product Categories**: Electronics, Clothing, Books, Accessories, etc.
- **Stock Management**: Track product inventory
- **Status Control**: Active/Inactive products
- **Dual View Modes**: Table view and Grid view
- **Search & Filter**: Search by name, category, or SKU
- **Product Details**: Name, category, price, stock, status, SKU, description

### 🎨 UI/UX Features
- **Material-UI Design**: Modern, clean interface
- **Responsive Layout**: Works on desktop and mobile
- **Navigation**: Sidebar navigation with icons
- **Alerts**: Success/error notifications
- **Color-coded Status**: Visual indicators for different states
- **Form Validation**: Required field validation
- **Confirmation Dialogs**: Safe delete operations

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to your project directory
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

### Navigation

- **Home**: Main landing page
- **Admin Panel**: Access the admin dashboard at `/admin`

## Admin Panel Structure

```
/admin
├── Dashboard
│   ├── Statistics Cards
│   ├── Recent Activities
│   └── Quick Actions
├── User Management
│   ├── User List (Table)
│   ├── Add/Edit User Dialog
│   └── Search & Filter
└── Product Management
    ├── Product List (Table/Grid)
    ├── Add/Edit Product Dialog
    └── Search & Filter
```

## Technologies Used

- **React 19.1.0**: Frontend framework
- **React Router DOM**: Client-side routing
- **Material-UI (MUI)**: UI component library
- **Material Icons**: Icon library
- **Emotion**: CSS-in-JS styling

## Key Components

### AdminPanel.jsx
Main admin panel component with:
- Responsive sidebar navigation
- Material-UI theme provider
- Route-based content rendering

### Dashboard.jsx
Overview dashboard with:
- Statistics cards
- Recent activities list
- Quick action buttons

### UserManagement.jsx
Complete user management with:
- User CRUD operations
- Role-based access control
- Search and filtering
- Form validation

### ProductManagement.jsx
Comprehensive product management with:
- Product CRUD operations
- Dual view modes (table/grid)
- Category management
- Stock tracking
- Search and filtering

## Features in Detail

### User Management Features
- ✅ Add new users
- ✅ Edit existing users
- ✅ Delete users with confirmation
- ✅ Search users by name or email
- ✅ Filter by role and status
- ✅ View user details in table format
- ✅ Role assignment (Admin, Moderator, User)
- ✅ Status management (Active, Inactive)

### Product Management Features
- ✅ Add new products
- ✅ Edit existing products
- ✅ Delete products with confirmation
- ✅ Search products by name, category, or SKU
- ✅ Toggle between table and grid view
- ✅ Category management
- ✅ Stock tracking with color-coded indicators
- ✅ Price management
- ✅ Product status control

### Dashboard Features
- ✅ Overview statistics
- ✅ Recent activity feed
- ✅ Quick action buttons
- ✅ Responsive design
- ✅ Real-time data display

## Customization

### Adding New Features
1. Create new components in `src/components/`
2. Add routes in `App.jsx`
3. Update navigation in `AdminPanel.jsx`

### Styling
- Uses Material-UI theme system
- Customizable color palette
- Responsive breakpoints
- Consistent spacing and typography

### Data Management
- Currently uses local state (useState)
- Can be easily connected to backend APIs
- Supports real-time updates

## Future Enhancements

- [ ] Authentication system
- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced filtering and sorting
- [ ] Export functionality (CSV, PDF)
- [ ] Bulk operations
- [ ] Analytics and reporting
- [ ] Image upload for products
- [ ] User profile management
- [ ] Audit logs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
