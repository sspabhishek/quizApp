import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ParticipantContext = createContext();

export const ParticipantProvider = ({ children }) => {
  const [participant, setParticipant] = useState({ username: "", id: "" });

  const saveParticipant = (username) => {
    const id = uuidv4(); 
    setParticipant({ username, id });
  };

  return (
    <ParticipantContext.Provider value={{ participant, saveParticipant }}>
      {children}
    </ParticipantContext.Provider>
  );
};

export const useParticipant = () => useContext(ParticipantContext);