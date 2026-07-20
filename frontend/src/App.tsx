import React, { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/store';
import { AppRouter } from '@/app/router';
import { Toaster } from 'react-hot-toast';

const ThemeAppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return <>{children}</>;
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeAppInitializer>
        <AppRouter />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </ThemeAppInitializer>
    </Provider>
  );
}
