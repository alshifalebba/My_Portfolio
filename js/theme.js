/**
 * Theme Toggle Logic
 * Handles dark/light mode switching using the sliding checkbox toggle.
 */

(function () {
    const themeStorageKey = 'portfolio-theme';
    
    const getStoredTheme = () => localStorage.getItem(themeStorageKey);
    const setStoredTheme = theme => localStorage.setItem(themeStorageKey, theme);
    
    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    const setTheme = theme => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        
        // Update checkbox state
        const toggleCheckbox = document.querySelector('#checkbox');
        if (toggleCheckbox) {
            toggleCheckbox.checked = (theme === 'dark');
        }
    };
    
    // Initialize theme immediately to avoid flash
    const initialTheme = getPreferredTheme();
    setTheme(initialTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!getStoredTheme()) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Handle toggle click
    window.addEventListener('DOMContentLoaded', () => {
        const toggleCheckbox = document.querySelector('#checkbox');
        if (toggleCheckbox) {
            // Ensure checkbox matches initial theme
            toggleCheckbox.checked = (document.documentElement.getAttribute('data-bs-theme') === 'dark');
            
            toggleCheckbox.addEventListener('change', () => {
                const newTheme = toggleCheckbox.checked ? 'dark' : 'light';
                setStoredTheme(newTheme);
                setTheme(newTheme);
            });
        }
    });
})();
