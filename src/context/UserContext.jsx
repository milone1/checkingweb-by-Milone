import { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = (props) => {

  const listUser = [];

  return (
    <UserContext.Provider
      value={{
        listUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}