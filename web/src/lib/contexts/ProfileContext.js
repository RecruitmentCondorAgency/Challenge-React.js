import { createContext, useState } from 'react';

const ProfileContext = createContext({
  selectedUniversity: null,
  setSelectedUniversity: () => {}
});

const ProfileProvider = ({ children }) => {
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  return (
    <ProfileContext.Provider
      value={{
        selectedUniversity,
        setSelectedUniversity
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileProvider, ProfileContext };
