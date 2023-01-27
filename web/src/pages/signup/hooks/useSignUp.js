import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../lib/axios';

const useSignUp = () => {
  const navigate = useNavigate();
  const signUp = async (data) => {
    const { passwordtwo, ...user } = data;
    try {
      await axiosInstance.post('users', user, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return signUp;
};

export default useSignUp;
