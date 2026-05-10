import { useUser } from '../context/UserContext';

/**
 * Header-Komponente der Anwendung.
 * Zeigt das Logo und eine personalisierte Begrüßung basierend auf dem aktuellen Benutzer an.
 * 
 * @returns {JSX.Element | null} Die gerenderte Header-Leiste oder null, falls kein Benutzer angemeldet ist.
 */
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
