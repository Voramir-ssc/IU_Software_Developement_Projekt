import { useUser } from '../context/UserContext';

const Header = () => {
  const { currentUser } = useUser();

  if (!currentUser) return null;

  return (
    <header className="app-header">
      <div className="logo">
        <div className="logo-icon">FH</div>
        <span>Familien Hero</span>
      </div>
      <div className="user-profile">
        <span>Hallo, <strong>{currentUser.name}</strong> 
          {currentUser.role === 'parent' ? ' 👨‍👩‍👧' : ' 👋'}
        </span>
      </div>
    </header>
  );
};

export default Header;
