import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';

/**
 * Haupt-Layout-Komponente der Anwendung.
 * Definiert die Grundstruktur bestehend aus Header, dynamischem Content-Bereich (Outlet) und der Navigation.
 * 
 * @returns {JSX.Element} Das Basis-Layout der React-App.
 */
const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};

export default Layout;
