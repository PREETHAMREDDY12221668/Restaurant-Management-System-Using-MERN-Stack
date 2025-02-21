import React, { useEffect, useState } from 'react';
import styles from './floatingIcon.module.css'; // Import custom styles

const FloatingMenuIcon = () => {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.querySelector('nav'); // Assuming your navbar is a <nav> element
            if (navbar) {
                const navbarRect = navbar.getBoundingClientRect();
                setIsNavbarVisible(navbarRect.bottom > 0); // Check if the navbar is visible
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isNavbarVisible) {
        return null; // Don't render the floating icon when the navbar is visible
    }

    return (
        <div className={styles.floatingIcon} onClick={() => alert('Menu clicked!')}>
            <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png" // Example menu icon
                alt="Menu"
                className={styles.icon}
            />
        </div>
    );
};

export default FloatingMenuIcon;
