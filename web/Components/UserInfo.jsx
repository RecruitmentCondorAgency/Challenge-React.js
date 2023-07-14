import { React, useState } from 'react';
import { UniversityDisplay } from './UniversityDisplay';
import '../styles.css';
import './ComponentStyles.css';

//This could be refactorized for fetching to university data
const universitiesData3 = [
  {
    web_page: 'http://www.meu.edu.jo/',
    country: 'Jordan',
    domain: 'meu.edu.jo',
    name: 'Middle East University',
  },
  {
    web_page: 'http://www.odtu.edu.tr/',
    country: 'Turkey',
    domain: 'odtu.edu.tr',
    name: 'Middle East Technical University',
  },
  {
    web_page: 'http://www.mtsu.edu/',
    country: 'USA',
    domain: 'mtsu.edu',
    name: 'Middle Tennessee State University',
  },
  {
    web_page: 'http://www.mga.edu/',
    country: 'USA',
    domain: 'mga.edu',
    name: 'Middle Georgia State College',
  },
  {
    web_page: 'http://www.mdx.ac.uk/',
    country: 'United Kingdom',
    domain: 'mdx.ac.uk',
    name: 'Middlesex University',
  },
  {
    web_page: 'http://www.middlebury.edu/',
    country: 'USA',
    domain: 'middlebury.edu',
    name: 'Middlebury College',
  },
  {
    web_page: 'http://www.istec.pt/',
    country: 'Portugal',
    domain: 'http://www.istec.pt/',
    name: 'INSTITUTO SUPERIOR DE TECNOLOGIAS AVANÇADAS - ISTEC',
  },
];

export function UserInfo({ username, dataActiveUser }) {
  const [selected, setSelected] = useState('');

  const selectedUniversity = universitiesData3.find((x) => x.name === selected);
  function handleSelected(name) {
    setSelected(name);
  }

  //Error handling
  let favoriteUniversities = [];
  if (dataActiveUser && dataActiveUser.universities) {
    favoriteUniversities = dataActiveUser.universities;
  }

  return (
    <div>
      <h2 className="greeting">Hello, {username}</h2>
      <div className="containers">
        <div className="my-favorites-container">
          <ul className="favorites-list">
            <h2 className="favorites-header">My Favorites</h2>
            {favoriteUniversities.map((x) => (
              <UniversityDisplay
                universities={x}
                key={x.name}
                selected={selected}
                setSelected={setSelected}
                handleSelected={handleSelected}
              />
            ))}
          </ul>
        </div>
        <div className="selected-container">
          <ul className="favorites-list">
            <h2 className="favorites-header">Selected University</h2>
            {selectedUniversity ? (
              <>
                <h1>{selectedUniversity.name}</h1>
                <p>
                  <strong>Country:</strong>
                  {selectedUniversity.country}
                </p>
                <p>
                  <strong>Capital:</strong>
                  {selectedUniversity.country}
                </p>
                <span>
                  <strong>WebPage:</strong>
                </span>
                <a href={selectedUniversity.domain}>
                  {selectedUniversity.domain}
                </a>

                <p>
                  <strong>Currency:</strong>
                  $$$$$
                </p>
                <p>
                  <strong>language:</strong>
                  English
                </p>
                <p>
                  <strong>Population:</strong>
                  150,000
                </p>
                <h2>
                  <br></br>This is the best university for studying Computer
                  Science and Machine Learning!.
                </h2>
              </>
            ) : (
              <p>No university selected.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
