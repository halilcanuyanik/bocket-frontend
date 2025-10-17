import { useState, useCallback } from 'react';

const useSnackbar = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const showSnackbar = useCallback(
    (message, severity = 'info', duration = 3000) => {
      setSnackbarMessage(message);
      setSnackbarSeverity(severity);
      setSnackbarOpen(true);

      const timer = setTimeout(() => {
        setSnackbarOpen(false);
        setSnackbarMessage('');
        setSnackbarSeverity('info');
      }, duration);

      return () => clearTimeout(timer);
    },
    []
  );

  const closeSnackbar = useCallback(() => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
    setSnackbarSeverity('info');
  }, []);

  return {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    showSnackbar,
    closeSnackbar,
  };
};

export default useSnackbar;
