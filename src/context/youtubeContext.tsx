'use client';

import { ReactNode, createContext, useContext, useState } from 'react';

type TypeAppContext = {
  youtubeVideoId: string;
  handleSetYoutubeVideoId: (youtubeUrl: string) => void;
};

const AppContext = createContext<TypeAppContext>({
  handleSetYoutubeVideoId: (youtubeUrl: string) => {},
  youtubeVideoId: '',
});

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [youtubeVideoId, setYoutubeVideoId] = useState<string>('');

  function handleSetYoutubeVideoId(youtubeUrl: string) {
    const videoId = youtubeUrl.split('v=').at(1)!;

    setYoutubeVideoId(videoId);
    return;
  }

  const contextValue = {
    handleSetYoutubeVideoId,
    youtubeVideoId,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
