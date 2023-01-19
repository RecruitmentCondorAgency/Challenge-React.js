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
  if (!Array.isArray(currencies)) throw new Error('Argument must be an array');
  const names = [];
  const symbols = [];

  for (const currency of currencies) {
    names.push(currency.name);
    symbols.push(currency.symbol);
  }

  return `${names.join(',')} ${symbols.join(',')}`;
};

export const getFormattedLanguages = (languages) => {
  if (!Array.isArray(languages)) throw new Error('Argument must be an array');

  return languages.map((lang) => lang.name).join(',');
};
