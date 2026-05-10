import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Gift, User } from 'lucide-react';

/**
 * Untere Navigationsleiste der mobilen Web-App.
 * Ermöglicht den schnellen Wechsel zwischen den Hauptseiten: Home, Aufgaben, Belohnungen und Profil.
 * 
 * @returns {JSX.Element} Die gerenderte Navigationsleiste mit Lucide-Icons.
 */
const Navigation = () => {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        <Home size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        <ClipboardList size={24} />
        <span>Aufgaben</span>
      </NavLink>
      <NavLink to="/rewards" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        <Gift size={24} />
        <span>Belohnungen</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        <User size={24} />
        <span>Profil</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;
