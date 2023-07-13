import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
 import logo from '../../logo.png';
function Navbar({ isAuthenticated, logout }) {

  const handleLogout = ( ) => {
    logout();
    localStorage.removeItem('user');
    window.location.href = '/';;
  };
    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom bg-white text-dark navbar nav fixed-top shadow-lg">
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <img className="logo" src={logo} width='50px'/>
        </a>
  
        <ul className="nav nav-pills">
          <li className="nav-item"><a href="/search" className="nav-link">Search</a></li>
          {isAuthenticated ? (
            <><li className="nav-item">
                <Link to='/profile' className="nav-link">Profile</Link>
              </li><li className="nav-item">
                  <span onClick={ handleLogout } className="nav-link">Logout</span>
                </li></>
            ) : (
              <li className="nav-item">
              <Link to='/'  className="nav-link">Login</Link>
            </li>
            )}
        
    
         
        </ul>
      </header>
  
    );
    }
    const mapStateToProps = (state) => {
      return {
        logout,
        isAuthenticated: state.isAuthenticated,
      };
    };
    
    export default connect(mapStateToProps)(Navbar);