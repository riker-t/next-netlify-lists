import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './NavBarMenu.module.css';

const NavbarMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    }

    useEffect(() => {
        // Add event listener to detect clicks outside of the menu
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Clean up event listener on component unmount
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    return (
        <div className={styles.menuContainer} ref={menuRef}>
            <div className={styles.hamburgerIcon} onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`${styles.menu} ${menuOpen ? styles.open : ''}`}>
                <div className={styles.menuButton}>
                    <Link href="/"><a onClick={() => setMenuOpen(false)} >Home</a></Link>
                </div>
                <div className={styles.menuButton}>
                    <Link href="/example_list_new"><a onClick={() => setMenuOpen(false)}>Example</a></Link>
                </div>

                {/* <Link href="/create_async"><a onClick={() => setMenuOpen(false)}>Create</a></Link> */}
            </div>
        </div>
    );
};

export default NavbarMenu;
