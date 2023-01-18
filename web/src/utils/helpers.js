export const getMenuClasses = ({ isActive, isPending, activeLink, pendingLink, menuLink }) => {
  let classes = menuLink;
  classes += isActive ? ` ${activeLink}` : isPending ? ` ${pendingLink}` : '';

  return classes;
};
