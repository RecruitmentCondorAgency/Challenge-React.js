import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout, useStore } from "../store";

interface Props {
  profile?: boolean;
}

const Menu: React.FC<Props> = ({profile}) => {
  const auth = useStore((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="flex content-center h-full">
      <ul className="flex gap-3">
        <li><Link to="/">Search</Link></li>
        {profile && <>
          <li><Link to="/profile">Profile</Link></li>
          {auth ? <>
            <li><button onClick={() => dispatch(logout())}>Logout</button></li>
          </> : <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>}
        </>}
      </ul>
    </nav>
  );
};

export default Menu;
