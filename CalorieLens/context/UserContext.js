import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    day: null,
    month: null,
    year: null,
    gender: null,
    unit: 'metric',
    height: null,
    weight: null,
    activity: null,
    goal: null,
    goal_weight: null,
    goal_speed: null,
    plan: {
      BMR: null,
      TDEE: null,
      caloricIntake: null,
      macronutrients: {
        proteinGrams: null,
        fatGrams: null,
        carbGrams: null,
      },
    },
  });

  const updateUser = (newData) => {
    setUserData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
