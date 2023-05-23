import React, { useState } from 'react';
import Link from 'next/link';
import styles from './NavBarMenu.module.css';

const NavbarMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className={`${styles.menuContainer} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
      <div className={styles.hamburgerIcon}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.menu}>
        <Link href="/"><a>Home</a></Link>
        <Link href="/example_list"><a>Example</a></Link>
        <Link href="/create_async"><a>Create</a></Link>
      </div>
    </div>
  );
};

export default NavbarMenu;
