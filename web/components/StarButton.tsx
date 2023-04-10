import React, { SVGProps } from "react";

import { classMerge } from "../utils/class-converter";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'fill'> {
  fill?: boolean;
}

const StarButton: React.FC<IconProps> = ({className = '', fill, ...props}) => {
  const classes = [className, "cursor-pointer hover:fill-yellow-200"];
  if (!/\bstroke-/.test(className)) classes.push("stroke-gray-600");
  if (!/\bfill-/.test(className)) classes.push(fill ? "fill-yellow-400" : "fill-none");

  return (
    <svg {...props} viewBox="0 0 14 14" className={classMerge(classes)}>
      <path strokeLinejoin="round" d="M7 1.25l1.7 3.4 3.9.6-2.8 3.2.7 4.1-3.6-1.9-3.6 1.9.7-4.1-2.8-3.2 3.9-.6z"/>
    </svg>
  );
};

export default StarButton;
