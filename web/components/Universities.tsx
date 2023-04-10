import React from "react";

import Icon from "./Icon";
import StarButton from "./StarButton";

import { University } from "../types";
import { getUser, updateUser } from "../services";
import { actions, useStore } from "../store";
import { useDispatch } from "react-redux";

interface Props {
  onUpdate?: (id: number[]) => void;
  universities?: University[];
}

const Universities: React.FC<Props> = ({onUpdate, universities}) => {
  const dispatch = useDispatch();

  const auth = useStore(state => state.auth);

  function handleClick(id: number) {
    if (!auth?.universities.includes(id)) addUserUniversity(id);
    else removeUserUniversity(id);
  }

  async function addUserUniversity(id: number) {
    const ids = await getUserUniversityIds();
    if (!ids.includes(id)) ids.push(id);
    const {universities} = await updateUser(auth.id, {universities: ids});
    dispatch(actions.updateAuth({universities}));
    onUpdate?.(universities);
  }

  async function removeUserUniversity(id: number) {
    let ids = await getUserUniversityIds();
    if (ids.includes(id)) ids = ids.filter(key => key !== id);
    const {universities} = await updateUser(auth.id, {universities: ids});
    dispatch(actions.updateAuth({universities}));
    onUpdate?.(universities);
  }

  async function getUserUniversityIds() {
    try {
      const {universities} = await getUser(auth.id);
      return universities;
    } catch (_e) {
      return [];
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {universities?.length ? universities.map(({id, country, language, name, url}, key) => (
        <div key={key} className="border shadow-lg rounded px-7 py-3 flex flex-col gap-5">
          <header className="flex gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-x-2 items-center">
              <strong className="font-bold text-lg">{name}</strong>
              <span>{country}</span>
            </div>
            <div className="flex gap-2">
              {auth && <StarButton className="h-5" fill={auth?.universities.includes(id)} onClick={() => handleClick(id)} />}
              <a href={url} rel="noreferrer" target="_blank">
                <Icon type="externalLink" className="h-5 text-gray-600" />
              </a>
            </div>
          </header>
          <section className="flex gap-2">
            <strong>Language:</strong>
            <span>{language}</span>
          </section>
        </div>
      )) : <>
        You don&apos;t have any university available.
      </>}
    </div>
  );
};


export default Universities;
