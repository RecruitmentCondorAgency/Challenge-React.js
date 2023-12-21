import React from 'react';

import { University } from '../../types/university';

// Props for the InfoLink component
interface InfoLinkProps {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

// InfoLink component for rendering links with custom styles
const InfoLink: React.FC<InfoLinkProps> = ({
  href,
  target = '_blank',
  rel = 'noopener noreferrer',
  className,
  children,
}) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`text-blue-500 ${className}`}
    >
      {children}
    </a>
  );
};

// Props for the UniversityDetailsCard component
interface UniversityDetailsProps {
  university: University;
}

// UniversityDetailsCard component for displaying details of a university
const UniversityDetailsCard: React.FC<UniversityDetailsProps> = ({
  university,
}) => {
  // Destructuring properties from the university object
  const { name, web_pages, domains, country } = university || {};

  return (
    <div className="container bg-white rounded-xl overflow-hidden shadow-md p-6">
      {/* University name */}
      <h2 className="text-xl font-semibold mb-2">{name}</h2>

      {/* University description */}
      <p className="text-gray-300 mb-4">
        {/* Sample text, you can replace this with the actual university description */}
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </p>

      {/* Website links */}
      <div className="mb-4">
        <strong>Website:</strong>{' '}
        {domains?.map((domain, index) => (
          <InfoLink key={domain} href={web_pages[index]}>
            {domain} {index < domains.length - 1 && ', '}
          </InfoLink>
        ))}
      </div>

      {/* Location */}
      <div className="mb-4">
        <strong>Location:</strong>{' '}
        {university['state-province'] ? (
          <InfoLink href={''}>{university['state-province']}</InfoLink>
        ) : (
          <span className="text-slate-400">NA</span>
        )}
      </div>

      {/* Country */}
      <div className="mb-4">
        <strong>Country:</strong>{' '}
        <InfoLink href={''}>{country || 'NA'}</InfoLink>
      </div>

      {/* Additional details (commented out) */}
      {/* <div className="mb-4">
        <strong>Language:</strong> {language}
      </div>
      <div className="mb-4">
        <strong>Population:</strong> {population}
      </div> */}
    </div>
  );
};

export default UniversityDetailsCard;
