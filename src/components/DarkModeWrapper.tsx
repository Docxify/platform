'use client';

import { useEffect, useState } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved === 'dark' || (!saved && prefersDark);

    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  return <>{children}</>;
}
