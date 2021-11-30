import { useState, createContext } from "react";

import { IMediaIG } from "../utils/Medias";

export interface IMediasContext {
  medias: IMediaIG[];
  setMedias: (image: IMediaIG[]) => void;
}

export const MediasContext = createContext({} as IMediasContext);

const MediasProvider = ({ children }: any) => {
  const [medias, setMedias] = useState<IMediaIG[]>([] as IMediaIG[]);
  return (
    <MediasContext.Provider
      value={{
        medias,
        setMedias,
      }}
    >
      {children}
    </MediasContext.Provider>
  );
};

export default MediasProvider;
