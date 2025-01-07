import React, { createContext, useContext, useEffect, useState } from "react";
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  let [user, setUser] = useState();
  let [questions, setQuestions] = useState([]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        questions,
        setQuestions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
