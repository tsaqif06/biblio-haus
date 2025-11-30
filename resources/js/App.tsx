import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import UserView from './pages/UserView';
import AdminView from './pages/AdminView';

type View = 'landing' | 'user' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');

  if (currentView === 'user') {
    return <UserView onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'admin') {
    return <AdminView onBack={() => setCurrentView('landing')} />;
  }

  return <LandingPage onNavigate={(view) => setCurrentView(view)} />;
}

export default App;
