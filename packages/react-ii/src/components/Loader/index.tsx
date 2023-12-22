// NewLoader component for displaying a different loading spinner
const Loader: React.FC = () => {
  return (
    <div role="status" className="flex justify-center">
      {/* Animated spinner using a dotted circle SVG */}
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-blue-500 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Dotted circle path for the spinner */}
        <circle cx="12" cy="12" r="10" fill="none" strokeDasharray="15 70" />
        {/* Accessible text for screen readers */}
        <span className="sr-only">Loading...</span>
      </svg>
    </div>
  );
};

export default Loader;
