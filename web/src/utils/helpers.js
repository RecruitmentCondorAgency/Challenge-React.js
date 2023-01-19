import axiosInstance from '../lib/axios';

export const getMenuClasses = ({ isActive, isPending, activeLink, pendingLink, menuLink }) => {
  let classes = menuLink;
  classes += isActive ? ` ${activeLink}` : isPending ? ` ${pendingLink}` : '';

  return classes;
};

export const fetchData = async (builder, errorCb) => {
  try {
    const response = await axiosInstance.get(builder.getPath(), {
      headers: {
        Accept: 'application/json'
      },
      signal: builder.signal
    });

    return response.data;
  } catch (error) {
    console.error(error);
    if (errorCb) errorCb(error);
  }
};
