import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinkClassName = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/assets/images/YSCSSA.ico" alt="YSCSSA Logo" className="logo-img" />
          <span className="logo-text-full">
            YSCSSA <span>延世学联</span>
          </span>
          <span className="logo-text-mobile">延世学联</span>
        </Link>

        <button
          type="button"
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="打开导航菜单"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <NavLink to="/" className={navLinkClassName} end>
              首页
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClassName}>
              关于本会
            </NavLink>
          </li>
          <li>
            <NavLink to="/departments" className={navLinkClassName}>
              部门构成
            </NavLink>
          </li>
          <li>
            <NavLink to="/activities" className={navLinkClassName}>
              活动概览
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
