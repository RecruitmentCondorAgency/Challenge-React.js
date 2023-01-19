import axiosInstance from '../lib/axios';

export const getMenuClasses = ({ isActive, isPending, activeLink, pendingLink, menuLink }) => {
  let classes = menuLink;
  classes += isActive ? ` ${activeLink}` : isPending ? ` ${pendingLink}` : '';

  return classes;
};

export const fetchData = async (builder, errorCb) => {
  try {
    const params = builder.getParams();
    const response = await axiosInstance.get(builder.getPath(), {
      headers: {
        Accept: 'application/json'
      },
      signal: builder.signal,
      ...([...params.entries()].length > 0 && { params })
    });

    return response.data;
  } catch (error) {
    console.error(error);
    if (errorCb) errorCb(error);
  }
};

export const getFormattedCurrencies = (currencies) => {
  const names = [];
  const symbols = [];

  for (const key in currencies) {
    names.push(currencies[key].name);
    symbols.push(currencies[key].symbol);
  }

  return `${names.join(',')} / ${symbols.join(',')}`;
};

export const getFormattedLanguages = (languages) => {
  const temp = [];
  for (const key in languages) {
    temp.push(languages[key]);
  }

  return temp.join(',');
};
