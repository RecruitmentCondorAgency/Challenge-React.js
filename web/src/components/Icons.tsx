type SVGProps = {
  className?: string;
};

export const StarIcon: React.FC<SVGProps> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 -960 960 960'
      className={`fill-current h-4 w-4 ${className}`}
    >
      <path d='m333-219 147-88 148 89-40-166 130-113-171-15-67-158-66 157-171 15 130 112-40 167Zm147-3L298-112q-11 7-22 6.5t-19-7.5q-8-6-12.5-15.5T243-151l48-208-161-141q-9-7-11.5-17.5t.5-20.5q3-10 11.5-17t20.5-8l213-18 82-197q5-11 14.5-16.5T480-800q10 0 19.5 5.5T514-778l83 197 212 18q12 1 20.5 8t11.5 17q3 10 .5 20.5T830-500L669-359l48 208q3 13-1.5 22.5T703-113q-8 7-19 7.5t-21-6.5L480-222Zm0-212Z' />
    </svg>
  );
};

export const StarFilledIcon: React.FC<SVGProps> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 -960 960 960'
      className={`fill-current h-4 w-4 ${className}`}
    >
      <path d='M480-222 298-112q-11 7-22 6.5t-19-7.5q-8-6-12.5-15.5T243-151l48-208-161-141q-9-7-11.5-17.5t.5-20.5q3-10 11.5-17t20.5-8l213-18 82-197q5-11 14.5-16.5T480-800q10 0 19.5 5.5T514-778l83 197 212 18q12 1 20.5 8t11.5 17q3 10 .5 20.5T830-500L669-359l48 208q3 13-1.5 22.5T703-113q-8 7-19 7.5t-21-6.5L480-222Z' />
    </svg>
  );
};
