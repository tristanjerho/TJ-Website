import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { CreateInvitation } from './pages/CreateInvitation';
import { InvitationView } from './pages/InvitationView';
import { Dashboard } from './pages/Dashboard';
import { NotFound } from './pages/NotFound';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isInvitationRoute = location.pathname.startsWith('/invite') || location.pathname === '/demo';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-rose-500 selection:text-white">
      {!isInvitationRoute && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateInvitation />} />
          <Route path="/invite/:id" element={<InvitationView />} />
          <Route path="/demo" element={<InvitationView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isInvitationRoute && <Footer />}
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
