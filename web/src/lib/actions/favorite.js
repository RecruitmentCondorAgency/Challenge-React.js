import axiosInstance from '../axios';
import { UPDATE_USER } from '../reducers/constants';

export const addToFavorite = async ({ user, university, controller, errorCb }) => {
  try {
    const response = await axiosInstance.put(
      `users/${user.id}`,
      {
        ...user,
        universities: [...user.universities, university]
      },
      {
        signal: controller?.signal,
        'Content-Type': 'application/json'
      }
    );

    /* dispatch({
        type: UPDATE_USER,
        payload: {
          data: response.data
        }
      }); */
    return response.data;
  } catch (error) {
    console.error(error);
    if (errorCb) errorCb(error);
  }
};

export const removeFromFavorite = async ({ user, university, controller, errorCb }) => {
  try {
    const response = await axiosInstance.put(
      `users/${user.id}`,
      {
        ...user,
        universities: user.universities.filter(({ id }) => university.id !== id)
      },
      {
        signal: controller?.signal,
        'Content-Type': 'application/json'
      }
    );

    /* dispatch({
        type: UPDATE_USER,
        payload: {
          data: response.data,
          isActive
        }
      }); */

    return response.data;
  } catch (error) {
    console.error(error);
    if (errorCb) errorCb(error);
  }
};
