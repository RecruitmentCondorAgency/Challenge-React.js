import { React } from 'react';

export function UniversityDisplay({
  universities,
  selected,
  setSelected,
  handleSelected,
}) {
  return (
    <div
      className="favUniversityContainer"
      style={{ cursor: 'pointer' }}
      onClick={() => handleSelected(universities.name)}>
      <div
        className="starEmoji"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontSize: '4rem',
        }}>
        ⭐
      </div>
      <li>
        <h1>{universities.name}</h1>
      </li>
      <p>
        <strong>Country:</strong> {universities.country}
      </p>
      <p>
        <a href={universities.web_page}>{universities.web_page}</a>
      </p>
    </div>
  );
}
