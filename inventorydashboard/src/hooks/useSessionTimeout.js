import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

const useSessionTimeout = (timeout = 30 * 60 * 1000) => {
  const { clearSession } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      alert('Session expired. Logging out.');
      clearSession();
      navigate('/', { replace: true });
    }, timeout);

    return () => clearTimeout(timer);
  }, [clearSession, navigate, timeout]);
};

export default useSessionTimeout;
