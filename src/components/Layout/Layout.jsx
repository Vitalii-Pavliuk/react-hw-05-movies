import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <nav>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>

      <main>
        <Outlet /> {/* ВАЖЛИВО: Тут рендеряться дочірні маршрути */}
      </main>
    </>
  );
};

export default Layout;
