import React = require('react');

export const Card: React.FC<{
  children: React.ReactNode;
  element?: string;
  className?: string;
}> = ({ children, element = 'div', className }) => {
  return React.createElement(element, {
    className: `drop-shadow-lg bg-white rounded-sm p-4 ${className}`,
    children,
  });
};
