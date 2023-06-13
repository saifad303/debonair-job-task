import React from "react";
import React, { createContext, useContext, useEffect, useState } from "react";

const Context = createContext(null);

export const useContext = () => {
  return useContext(Context);
};

const ContextProvider = () => {
  return <Context.Provider></Context.Provider>;
};

export default ContextProvider;
