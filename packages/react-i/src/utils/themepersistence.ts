export const getInitialTheme = (): string => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return storedTheme || (prefersDark ? 'dark' : 'light');
};

export const persistTheme = (theme: string): void => {
    localStorage.setItem('theme', theme);
};
