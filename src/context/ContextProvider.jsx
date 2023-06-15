import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext(null);

export const useContextProvider = () => {
  return useContext(Context);
};

const ContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(0);
  const [isEditAdminOpen, setIsEditAdminOpen] = useState(false);

  const handleEditAdminModalOpen = () => setIsEditAdminOpen(true);
  const handleEditAdminModalClose = () => setIsEditAdminOpen(false);

  const value = {
    userId,
    setUserId,
    handleEditAdminModalOpen,
    handleEditAdminModalClose,
    setIsEditAdminOpen,
    isEditAdminOpen,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
