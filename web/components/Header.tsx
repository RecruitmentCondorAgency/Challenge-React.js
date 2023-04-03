import React, { ReactNode } from "react";
import Logo from "./Logo";

interface Props {
  children?: ReactNode;
}

const Header: React.FC<Props> = ({children}) => (
  <header className="flex flex-wrap items-center justify-between border-b shadow-lg px-6 py-3">
    <Logo className="h-8" />
    {children}
  </header>
);

export default Header;
