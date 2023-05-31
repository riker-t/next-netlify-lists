import React from 'react';
import Link from 'next/link';
import NavBarMenu from './NavBarMenu';
import styles from './NavBar.module.css';
import SearchIcon from '@mui/icons-material/Search'


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={styles.logo}>Lists</a>
      </Link>
      <Link href="/search">
        <SearchIcon className={styles.icon} fontSize='large' />
      </Link>
      {/* <NavBarMenu /> */}
    </nav>
  );
};

export default Navbar;
