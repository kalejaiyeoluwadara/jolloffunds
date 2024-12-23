"use client";
import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [userName, setUserName] = useState("");
  return (
    <AppContext.Provider
      value={{
        userName,
        setUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobal = () => {
  return useContext(AppContext);
};

export default AppProvider;
