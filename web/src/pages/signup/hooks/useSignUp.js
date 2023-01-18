import axiosInstance from '../../../lib/axios';

const useSignUp = () => {
  const signUp = async (data) => {
    const { passwordtwo, ...user } = data;
    try {
      await axiosInstance.post('users', user, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return signUp;
};

export default useSignUp;
