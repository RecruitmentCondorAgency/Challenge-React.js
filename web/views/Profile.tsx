import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import Universities from '../components/Universities';

import { actions, useStore } from '../store';
import { University } from '../types';
import { getUniversities, getUser } from '../services';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useStore(state => state.auth);
  const [universities, setUniversities] = useState<University[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onLoad(); }, []);

  async function onLoad() {
    // check auth, redirect if is not logged
    if (!auth) navigate('/login');

    loadUniversities(auth?.universities);

    // update user universities, just in case something changed recently
    const {universities} = await getUser(auth.id);
    dispatch(actions.updateAuth({universities}));
  }

  async function loadUniversities(keys?: number[]) {
    if (!keys?.length) {
      setUniversities([]);
    } else {
      try {
        setUniversities(await getUniversities(keys));
      } catch (_err) {
        setUniversities([]);
      }
    }
  }

  return (
    <Layout className="flex flex-col gap-3 items-center mt-8" profile>
      <div className="max-w-2xl w-full flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-primary">My Favorites</h1>
        <Universities
          onUpdate={keys => loadUniversities(keys)}
          universities={universities}
        />
      </div>
    </Layout>
  );
};

export default Profile;
