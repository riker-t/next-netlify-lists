import { useState, useEffect, useCallback } from 'react';
import styles from './BottomNav.module.css';
import { FaHome, FaFolderOpen, FaPlusSquare } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';


export default function BottomNav() {
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = useCallback(() => { // Wrap handleScroll with useCallback
        const currentScrollPosition = window.pageYOffset;
        const isScrollingUp = lastScrollPosition > currentScrollPosition;

        setIsVisible(isScrollingUp || currentScrollPosition === 0);
        setLastScrollPosition(currentScrollPosition);
    }, [lastScrollPosition]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    return (
        <>
            <div
                className={`${styles.container} ${isVisible ? styles.visible : styles.hidden}`}
            >

                <nav className={styles.bottomNav}>
                    {/* Add your navigation items here */}
                    {/* <a href="/"><FaHome className={styles.icon} /></a> */}
                    <a href="/"><FaHome className={styles.icon} /></a>
                    {/* <a href="/pricing"><FaUser className={styles.icon} /></a> */}
                    {/* <a href="/create"><FaPlusSquare className={styles.icon} /></a> */}
                    <a href="/create_async"><FaPlusSquare className={styles.icon} /></a>
                </nav>
            </div> {/* Add this line */}

        </>
    );
};

