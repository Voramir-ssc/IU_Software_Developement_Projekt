import React from 'react';

/**
 * Header Component
 * Displays the application logo and the current logged-in user profile snippet.
 * This component is stateless and purely presentational.
 */
export const Header: React.FC = () => {
  return (
    <header>
      <div className="logo">
        <div className="logo-icon">FH</div>
        <span>Familien Hero</span>
      </div>
      <div className="user-profile">
        <span>Hallo, <strong>Stefan</strong> 👋</span>
      </div>
    </header>
  );
};
