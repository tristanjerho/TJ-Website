import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CreateInvitation } from './pages/CreateInvitation';
import { InvitationView } from './pages/InvitationView';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

const AppLayout: React.FC = () => {
  const location = useLocation();
  // Standard navigation bar only on builder/dashboard/admin routes
  const showNav = location.pathname === '/create' || location.pathname === '/dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {showNav && <Navbar />}
      <main className="flex-1">
        <Routes>
          {/* Main website opens directly into Angel rose (Yahoo)'s invitation experience! */}
          <Route path="/" element={<InvitationView />} />
          <Route path="/invite/:id" element={<InvitationView />} />
          <Route path="/demo" element={<InvitationView />} />
          <Route path="/create" element={<CreateInvitation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showNav && <Footer />}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
