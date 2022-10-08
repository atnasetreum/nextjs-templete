import { PropsWithChildren } from 'react';

import { MainMenu, Navbar } from '@components/ui';

interface Props {
  title?: string;
}

export const MainLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <>
      <Navbar />
      <MainMenu />
      {children}
    </>
  );
};

export default MainLayout;
