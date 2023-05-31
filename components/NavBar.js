import React from 'react';
import Link from 'next/link';
import NavBarMenu from './NavBarMenu';
import styles from './NavBar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>Lists</a>
      </Link>
      <NavBarMenu />
    </nav>
  );
};

export default Navbar;
