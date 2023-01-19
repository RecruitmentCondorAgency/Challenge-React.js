import axiosInstance from '../axios';
import { UPDATE_USER } from '../reducers/constants';

export const addToFavorite =
  (dispatch) =>
  async ({ user, university, universities, controller, errorCb }) => {
    try {
      const response = await axiosInstance.put(
        `users/${user.id}`,
        {
          ...user,
          universities: [...universities, university]
        },
        {
          signal: controller.signal,
          'Content-Type': 'application/json'
        }
      );

      dispatch({
        type: UPDATE_USER,
        payload: response.data
      });
      return response.data;
    } catch (error) {
      console.error(error);
      if (errorCb) errorCb(error);
    }
  };

export const removeFromFavorite =
  (dispatch) =>
  async ({ user, university, universities, controller, errorCb }) => {
    try {
      const response = await axiosInstance.put(
        `users/${user.id}`,
        {
          ...user,
          universities: universities.filter(({ id }) => university.id !== id)
        },
        {
          signal: controller.signal,
          'Content-Type': 'application/json'
        }
      );

      dispatch({
        type: UPDATE_USER,
        payload: response.data
      });

      return response.data;
    } catch (error) {
      console.error(error);
      if (errorCb) errorCb(error);
    }
  };
