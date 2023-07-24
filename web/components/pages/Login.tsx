import { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import axios from 'axios';



const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/users/');
      const users = response.data;
      users.filter((user) =>{
      if (user.username == username && user.password == password) {
            login({ username, password});
            const data = {
              username: username,
              id: user.id,
            }
            localStorage.setItem('user', JSON.stringify(data));
             window.location.href= '/profile';
          } 
      });
    } catch (error) {
      console.error('Error:', error);
    }
    
  };

  return (
    <>


 <section>
 <br></br><br></br>
    <div className="container mt-5">
    <div className="row d-flex justify-content-center">
        <div className="col-md-6">
            <div className="card px-5 py-5">
                <form onSubmit={ handleLogin }>
                <div className="form-data">
                    <div className="forms-inputs mb-4"> 
                     <span>Username</span> 
                     <input type="text" className="form-control" 
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     placeholder='username'/>
                    </div>
                    <div className="forms-inputs mb-4"> 
                    <span>Password</span>
                     <input type="password" 
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                     className="form-control" />
                    </div>
                    <div className="mb-3">
                       <button className="btn btn-primary w-100" type='submit'>Login</button> 
                     </div>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
  </section>
 
    </>
  );
}
const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(LoginForm);