import { NavLink } from 'react-router-dom';
import { Home, ClipboardList, Gift, User } from 'lucide-react';

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
