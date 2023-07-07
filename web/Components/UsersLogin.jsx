import { React } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import '../styles.css';
import './ComponentStyles.css';

<Route path="/login" component={UsersLogin} />;

export function UsersLogin({
  username,
  password,
  setUsername,
  setPassword,
  setIsSubmitted,
}) {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    navigate('/profile');
  }

  return (
    <>
      <div>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            className="input"
            type="text"
            id="username"
            name="username"
            required
            placeholder="Username@user.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div />
          <div>
            <button className="button" type="submit">
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
