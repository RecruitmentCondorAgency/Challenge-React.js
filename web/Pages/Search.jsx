import React from 'react';
import PageNav from '../Components/PageNav';
import { useEffect, useState } from 'react';
import './search.css';
import '../Components/ComponentStyles.css';
import '../styles.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(
    function () {
      async function fetchUniversities() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `http://universities.hipolabs.com/search?name=${query}`
          );

          if (!res.ok)
            throw new Error('Something went wrong fetching universities');

          const data = await res.json();

          setUniversities(data);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setUniversities([]);
        setError('');
        return;
      }

      fetchUniversities();
    },
    [query]
  );

  return (
    <>
      <div>
        <PageNav />
        <p>Search for any University you like in the world</p>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search Universities..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p className="num-results">
        Found <strong>{universities.length}</strong> results
      </p>

      <main>
        <div>
          <div className="favUniversityContainer">
            {isLoading && <Loader />}
            {!isLoading && !error && (
              <ul>
                {universities?.map((university, index) => (
                  <div key={university.name + index}>
                    <li>
                      <h1>{university.name}</h1>
                    </li>
                    <div>
                      <p>
                        <strong>Country:</strong>
                        {university.country}
                      </p>
                      <p>{university.web_pages}</p>
                    </div>
                  </div>
                ))}
              </ul>
            )}
            {error && <ErrorMessage message={error} />}
          </div>
        </div>
      </main>
    </>
  );
}

function ErrorMessage({ message }) {
  return <p>⛔{message}</p>;
}

function Loader() {
  return <p>Loading...</p>;
}
