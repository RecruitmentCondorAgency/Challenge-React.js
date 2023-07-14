import { Link } from 'react-router-dom';
import PageNavLogin from '../Components/PageNavLogin';
import { UsersLogin } from '../Components/UsersLogin';

function login({
  username,
  password,
  setUsername,
  setPassword,
  setIsSubmitted,
  isSubmitted,
}) {
  return (
    <div>
      <PageNavLogin />
      <UsersLogin
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        setIsSubmitted={setIsSubmitted}
        isSubmitted={isSubmitted}
      />
      <h2>
        {' '}
        <a href="/">Create an Account </a>
      </h2>
      <p>Test Username</p>
      <h3>user1@example.com</h3>
      <p>Password</p>
      <h3>1234567</h3>
    </div>
  );
}

export default login;
