import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar       from './components/Navbar';
import Login        from './pages/Login';
import Dashboard    from './pages/Dashboard';
import Tickets      from './pages/Tickets';
import CreateTicket from './pages/CreateTicket';
import TicketDetail from './pages/TicketDetail';
import Products     from './pages/Products';
import Users        from './pages/Users';
import NotFound     from './pages/NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/"               element={<Navigate to="/login" replace />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/dashboard"      element={<Dashboard />} />
          <Route path="/tickets"        element={<Tickets />} />
          <Route path="/tickets/create" element={<CreateTicket />} />
          <Route path="/tickets/:id"    element={<TicketDetail />} />
          <Route path="/products"       element={<Products />} />
          <Route path="/users"          element={<Users />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
