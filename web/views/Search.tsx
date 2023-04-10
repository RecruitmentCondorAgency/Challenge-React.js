import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import Universities from '../components/Universities';

import { actions, useStore } from '../store';
import { University } from '../types';
import { findUniversities, getUser } from '../services';


const Search: React.FC = () => {
  const dispatch = useDispatch();

  const auth = useStore(state => state.auth);
  const [search, setSearch] = useState<string>('');
  const [universities, setUniversities] = useState<University[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onLoad(); }, []);

  async function onLoad() {
    if (!auth) return;

    // first load of universities
    loadUniversities(search);

    // update user universities, just in case something changed recently
    const {universities} = await getUser(auth.id);
    dispatch(actions.updateAuth({universities}));
  }

  async function loadUniversities(query?: string) {
    setSearch(query || '');
    try {
      setUniversities(await findUniversities(query));
    } catch (_err) {
      setUniversities([]);
    }
  }

  return (
    <Layout className="flex flex-col gap-3 items-center mt-8" profile>
      <div className="max-w-2xl w-full flex flex-col gap-8">
        <SearchBar
          onSearch={loadUniversities}
          value={search}
        />
        <Universities universities={universities} />
      </div>
    </Layout>
  );
};

export default Search;
