import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <>
      <nav className={styles.nav}>
        <NavLink to="/home" className={styles.navLink}>Home</NavLink>
        <NavLink to="/movies" className={styles.navLink}>Movies</NavLink>
      </nav>

      <main>
        <Outlet /> {/* ВАЖЛИВО: Тут рендеряться дочірні маршрути */}
      </main>
    </>
  );
};

export default Layout;
