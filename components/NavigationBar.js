import React, { useState, useEffect, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import styles from './NavigationBar.module.css';
import Link from 'next/link';


const NavigationBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef();

    const toggleMenu = () => {
        setMenuVisible((prevMenuVisible) => !prevMenuVisible);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">
                    <a>Lists</a>
                </Link>
            </div>
            <div className={styles.menuIcon} onClick={toggleMenu}>
                <FaBars />
            </div>
            <ul
                ref={menuRef}
                className={`${styles.menu} ${menuVisible ? styles.visible : ''}`}
            >
                <li>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </li>
                <li>
                    <Link href="/create_async">
                        <a>Create</a>
                    </Link>
                </li>
                <li>
                    <Link href="/example_list">
                        <a>Example</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
