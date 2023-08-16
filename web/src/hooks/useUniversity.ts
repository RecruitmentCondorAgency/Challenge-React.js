import { useMutation, useQueryClient } from '@tanstack/react-query';
import { University } from '../types/university';
import { userAPI } from '../repository/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { saveUser } from '../store/userSlice';

export const useUniversity = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const isFavorite = (university: University) =>
    user.universities.some((uni) => uni.name === university.name);

  const queryClient = useQueryClient();

  const { mutate: addUniversity } = useMutation({
    mutationFn: (university: University) =>
      userAPI.addUniversity(user, university),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['universities']);
      queryClient.invalidateQueries(['user']);
      dispatch(saveUser(data));
    },
  });

  const { mutate: removeUniversity } = useMutation({
    mutationFn: (university: University) =>
      userAPI.removeUniversity(user, university),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['universities']);
      queryClient.invalidateQueries(['user']);
      dispatch(saveUser(data));
    },
  });

  return {
    isFavorite,
    addUniversity,
    removeUniversity,
  };
};
