import React, { ReactNode } from "react";
import Icon from "./Icon";

interface Props {
  children?: ReactNode;
}

const Header: React.FC<Props> = ({children}) => (
  <header className="flex flex-wrap items-center justify-between border-b shadow-lg px-6 py-3">
    <Icon type="logo" className="h-8 text-primary" />
    {children}
  </header>
);

export default Header;
