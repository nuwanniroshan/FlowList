import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';

import { store } from './app/store';
import theme from './theme/theme';
import MainLayout from './components/layout/MainLayout';
import Navigation from './components/layout/Navigation';
import NotFoundPage from './components/common/NotFoundPage';
import { initializeDatabase } from './db/database';

// Lazy load pages for code splitting
const MainView = lazy(() => import('./pages/MainView'));
const FlowMode = lazy(() => import('./pages/FlowMode'));
const CompletedView = lazy(() => import('./pages/CompletedView'));
const SettingsView = lazy(() => import('./pages/SettingsView'));

// Loading component for Suspense
function LoadingFallback() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
      }}
    >
      Loading...
    </div>
  );
}

function App() {
  useEffect(() => {
    initializeDatabase().catch(() => {
      // Database initialization failed - silently handle
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <MainLayout>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<MainView />} />
                <Route path="/flow" element={<FlowMode />} />
                <Route path="/completed" element={<CompletedView />} />
                <Route path="/settings" element={<SettingsView />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </MainLayout>
          <Navigation />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
