import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Dashboard from './pages/Dashboard';
import TaskCreate from './pages/TaskCreate';

/**
 * Hauptkomponente der Anwendung
 * Konfiguriert die Routing-Struktur fuer die Single Page Application (SPA).
 * Ermoeglicht die Navigation zwischen dem Dashboard und dem Formular zur Aufgabenerstellung.
 */
function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        
        <main className="content" style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<TaskCreate />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
