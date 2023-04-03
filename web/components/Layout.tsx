import React, { ReactNode } from "react";
import Menu from "./Menu";
import Header from "./Header";

interface Props {
  children?: ReactNode;
  profile?: boolean;
}

const Layout: React.FC<Props> = ({children, profile}) => (
  <>
    <Header>
      <Menu profile={profile} />
    </Header>
    <main className="grow px-6 py-3">
      {children}
    </main>
  </>
);

export default Layout;
