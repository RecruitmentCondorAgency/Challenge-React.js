import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';

import { University } from '../types';
import { getUniversity } from '../services';
import { useParams } from 'react-router-dom';
import Icon from '../components/Icon';

const University: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams() as {
    id: string;
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [university, setUniversity] = useState<University|undefined>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onLoad(); }, []);

  async function onLoad() {
    const id = parseInt(params.id);
    setLoading(true);
    try {
      setUniversity(await getUniversity(id));
    } catch (_err) {
      setUniversity(undefined);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout className="flex flex-col gap-3 items-center mt-8" profile>
      <div className="max-w-2xl w-full flex flex-col gap-8">
        <h1 className="text-2xl font-bold text-primary">Selected University</h1>
        {!loading && <div className="border shadow-lg rounded px-7 py-3 flex flex-col gap-5">
          {university ? <>
            <header className="flex gap-2 items-center justify-between">
              <strong className="text-lg">{university.name}</strong>
              <Icon type="arrowLeft" className="text-sky-500 h-6 cursor-pointer" onClick={() => navigate(-1)} />
            </header>
            <section className="flex flex-col gap-2">
              <div className="flex gap-2">
                <strong>Website:</strong>
                <a href={university.url} rel="noreferrer" target="_blank" className="text-sky-500">{university.url}</a>
              </div>
              <div className="flex gap-2">
                <strong>Location:</strong>
                <span>{university.location}</span>
              </div>
              <div className="flex gap-2">
                <strong>Country:</strong>
                <span>{university.country}</span>
              </div>
              <div className="flex gap-2">
                <strong>Country&apos;s Capital:</strong>
                <span>{university.capital}</span>
              </div>
              <div className="flex gap-2">
                <strong>Currency:</strong>
                <span>{university.currency}</span>
              </div>
              <div className="flex gap-2">
                <strong>Language:</strong>
                <span>{university.language}</span>
              </div>
              <div className="flex gap-2">
                <strong>Population:</strong>
                <span>{university.population}</span>
              </div>
            </section>
          </> : <>
            The university selected does not exists.
          </>}
        </div>}
      </div>
    </Layout>
  );
};

export default University;
