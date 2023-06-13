import React from 'react';

//FIXME: 이걸 어떻게 해야하나ㅜㅜ
export const ColorModeContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: (mode: ModeType) => {},
});
