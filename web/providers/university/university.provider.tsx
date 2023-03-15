import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";
import { QueryActions } from "../../common/constants/queries.constant";
import { UniversityEntity } from "../../common/entities";
import { FCWithChildren } from "../../common/types/general.types";
import { ErrorQuery } from "../../common/types/use-query.types";
import { searchUniversitiesByName } from "../../network/university.network";
import { UseUniversity } from "./types";
import { debounce } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../common/hooks/useDebounce";

const initialUniversityContext: UseUniversity = [
  {
    universityName: "",
    universities: [],
    universitiesError: null,
    universitiesLoading: false,
  },
  { setUniversityName: (_: string) => void 0 },
];

export const UniversityContext = createContext<UseUniversity>(
  initialUniversityContext
);

export const UniversityProvider: FCWithChildren = ({ children }) => {
  const [_, setSearchParams] = useSearchParams();
  const [name, setName] = useState("");
  const { error, data, isLoading, refetch } = useQuery<
    UniversityEntity[],
    ErrorQuery
  >(
    [QueryActions.AUTH_GET_LOGGED, name],
    () => searchUniversitiesByName(name),
    { enabled: false, refetchOnWindowFocus: false }
  );
  useDebounce(
    () => {
      setSearchParams({ name });
      if (name && name.length >= 3) {
        refetch();
      }
    },
    [name],
    500
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchName = searchParams.get("name");

    if (name != searchName && (!name || name.length === 0)) {
      setName(searchName ?? "");
    }
  }, []);

  const setUniversityName = useCallback((name: string) => {
    setName(name);
  }, []);

  return (
    <UniversityContext.Provider
      value={[
        {
          universityName: name,
          universitiesError: error,
          universities: data ?? [],
          universitiesLoading: isLoading,
        },
        { setUniversityName },
      ]}
    >
      {children}
    </UniversityContext.Provider>
  );
};
