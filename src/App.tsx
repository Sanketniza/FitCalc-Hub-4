import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import InputForm from './pages/InputForm';
import Results from './pages/Results';
import Team from './pages/Team';
import { UserDataProvider } from './context/UserDataContext';

export function App() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <UserDataProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/input" element={<InputForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/results" element={<Results />} />
              <Route path="/team" element={<Team />} />
            </Routes>
          </main>
          <footer className="bg-slate-800 dark:bg-slate-900 text-slate-100 py-4 text-center">
            <p>&copy; 2025 FitCalc Hub. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </UserDataProvider>
  );
}

export default App;
