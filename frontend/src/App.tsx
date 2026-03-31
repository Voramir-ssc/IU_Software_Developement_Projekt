import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Dashboard from './pages/Dashboard';
import TaskCreate from './pages/TaskCreate';

/**
 * App Main Component
 * Sets up the routing structure for the Single Page Application (SPA).
 * Provides navigation between the Dashboard and the Task Creation form.
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
