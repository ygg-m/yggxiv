import { createContext, useContext } from "react";

type CharacterContextType = {};

const CharacterContext = createContext<CharacterContextType>({});

export const useCharacterContext = () => useContext(CharacterContext);

type CharacterContextProps = { children: React.ReactNode };

export const CharacterProvider: React.FC<CharacterContextProps> = ({
  children,
}) => {
  const value: CharacterContextType = {};
  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};
