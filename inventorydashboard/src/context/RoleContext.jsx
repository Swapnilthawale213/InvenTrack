import { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [zoneId, setZoneId] = useState(null);

  const logout = () => {
    setRole(null);
    setZoneId(null);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, zoneId, setZoneId, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);

