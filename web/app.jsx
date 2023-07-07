import { React, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/LogIn';
import Profile from './Pages/Profile';
import Search from './Pages/Search';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dataActiveUser, setDataActiveUser] = useState(null);
  const [userID, setUserID] = useState(null);

  const handleLogoutClick = () => {
    setIsSubmitted(false);
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('http://localhost:3000/users');
      const userdata2 = await res.json();

      const emailToFind = username;
      const foundUser = userdata2.find((user) => user.email === emailToFind);
      const tempUserID = foundUser ? foundUser.id : null;

      const tempDataActiveUser = await userdata2[tempUserID - 1];

      setDataActiveUser(tempDataActiveUser);
      setUserID(tempUserID);
    }

    fetchUser();
  }, [username]); // We call fetchUser when the username changes

  return (
    <div>
      <div className="app">
        {/* <Logo
          handleLogoutClick={handleLogoutClick}
          setIsSubmitted={setIsSubmitted}
          isSubmitted={isSubmitted}
        /> */}
      </div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                username={username}
                password={password}
                setUsername={setUsername}
                setPassword={setPassword}
                setIsSubmitted={setIsSubmitted}
                isSubmitted={isSubmitted}
              />
            }
          />
          <Route
            path="/Profile"
            element={
              <Profile
                username={username}
                userID={userID}
                dataActiveUser={dataActiveUser}
              />
            }
          />
          <Route path="/Search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
