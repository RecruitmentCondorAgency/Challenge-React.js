import React, { ReactNode } from "react";
import { classMerge } from "../utils/class-converter";

import Menu from "./Menu";
import Header from "./Header";

interface Props {
  children?: ReactNode;
  className?: unknown;
  profile?: boolean;
}

const Layout: React.FC<Props> = ({children, className, profile}) => (
  <>
    <Header>
      <Menu profile={profile} />
    </Header>
    <main className={classMerge("grow px-6 py-3", className)}>
      {children}
    </main>
  </>
);

export default Layout;
