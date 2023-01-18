import axiosInstance from '../axios';

/**
 * @param user
 * @returns boolean
 */
const login = async (user) => {
  try {
    const response = await axiosInstance.get('users', {
      headers: {
        Accept: 'application/json'
      }
    });

    return response.data.find((usr) => usr.email === user.email && usr.password === user.password);
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default login;
