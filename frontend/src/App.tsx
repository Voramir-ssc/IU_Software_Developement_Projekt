import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Rewards from './pages/Rewards';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="profile" element={<div>Profil-Ansicht (Demnächst)</div>} />
      </Route>
    </Routes>
  );
}

export default App;
