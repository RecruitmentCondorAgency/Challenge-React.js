import { University } from "../../types/university";

interface InfoLinkProps {
  href: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
}

const InfoLink: React.FC<InfoLinkProps> = ({
  href,
  target = "_blank",
  rel = "noopener noreferrer",
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

interface UniversityDetails {
  university: University;
}

const UniversityDetailsCard: React.FC<UniversityDetails> = ({ university }) => {
  const { name, web_pages, domains, country } = university || {};
  return (
    <div className="container bg-white rounded-xl overflow-hidden shadow-md p-6">
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <p className="text-gray-300 mb-4">
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
      <div className="mb-4">
        <strong>Website:</strong>{" "}
        {domains?.map((domain, index) => (
          <InfoLink key={domain} href={web_pages[index]}>
            {domain} {index < domains.length - 1 && ", "}
          </InfoLink>
        ))}
      </div>
      <div className="mb-4">
        <strong>Location:</strong>{" "}
        <InfoLink href={""}>{university["state-province"]}</InfoLink>
      </div>
      <div className="mb-4">
        <strong>Country:</strong> <InfoLink href={""}>{country}</InfoLink>
      </div>
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
