import React, { createContext, useContext, useState, useEffect } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const storedSession = sessionStorage.getItem("sessionData");
    if (storedSession) {
      setSessionData(JSON.parse(storedSession));
    }
  }, []);

  const clearSession = () => {
    setSessionData(null);
    sessionStorage.removeItem("sessionData");
  };

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
