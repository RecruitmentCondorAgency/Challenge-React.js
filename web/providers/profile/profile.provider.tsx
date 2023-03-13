import { useMutation } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { keys } from "../../common/constants/keys.constants";
import { QueryActions } from "../../common/constants/queries.constant";
import { UniversityEntity, UserEntity } from "../../common/entities";
import { useLocalStorage } from "../../common/hooks/useLocalStorage";
import { FCWithChildren } from "../../common/types/general.types";
import { ErrorQuery } from "../../common/types/use-query.types";
import { getUser, updateProfile } from "../../network/users.network";
import { useAuth } from "../auth/auth.hook";
import { UseProfile } from "./types";

const initialProfileContext: UseProfile = [
  {
    updateProfileData: false,
    updateProfileError: undefined,
    updateProfileLoading: false,
  },
  {
    addUniversity: async (_: UniversityEntity) => void 0,
    removeUniversity: async (_: UniversityEntity) => void 0,
  },
];

export const ProfileContext = createContext<UseProfile>(initialProfileContext);

export const ProfileProvider: FCWithChildren = ({ children }) => {
  const [, { revalidateUser }] = useAuth();
  const [userId, setUserId] = useLocalStorage<string | undefined>(
    keys.USER_ID,
    undefined
  );
  const [updateProfileError, setUpdateProfileError] = useState<
    string | undefined
  >(undefined);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const { data, error, mutate, isSuccess } = useMutation<
    any,
    ErrorQuery,
    UserEntity
  >([QueryActions.PROFILE_UPDATE], updateProfile);

  const removeUniversity = useCallback(
    async (university: UniversityEntity) => {
      setLoadingUpdate(true);
      try {
        const response = (await getUser(userId)) as UserEntity;
        if (!response) {
          setUpdateProfileError("The user no longer exists!");
          setUserId(undefined);
          window.location.reload();
          return;
        }

        mutate({
          ...response,
          universities: (response.universities ?? []).filter(
            (x) => x.name !== university.name
          ),
        });
      } catch (error) {
        setUpdateProfileError("Unexpected Error. Please contact administrator");
      } finally {
        setLoadingUpdate(false);
      }
    },
    [mutate]
  );
  const addUniversity = useCallback(
    async (university: UniversityEntity) => {
      setLoadingUpdate(true);
      try {
        const response = (await getUser(userId)) as UserEntity;
        if (!response) {
          setUpdateProfileError("The user no longer exists!");
          setUserId(undefined);
          window.location.reload();
          return;
        }

        mutate({
          ...response,
          universities: [...(response.universities ?? []), university],
        });
      } catch (error) {
        setUpdateProfileError("Unexpected Error. Please contact administrator");
      } finally {
        setLoadingUpdate(false);
      }
    },
    [mutate]
  );

  useEffect(() => {
    if (isSuccess) {
      revalidateUser();
    }
  }, [isSuccess]);

  return (
    <ProfileContext.Provider
      value={[
        {
          updateProfileData: data,
          updateProfileError:
            error?.response?.data?.message ?? updateProfileError,
          updateProfileLoading: loadingUpdate,
        },
        { addUniversity, removeUniversity },
      ]}
    >
      {children}
    </ProfileContext.Provider>
  );
};
