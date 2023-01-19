import axiosInstance from '../axios';

const fetchUniversities = async (query, controller) => {
  const urlParams = new URLSearchParams();
  let path = 'universities';
  if (query) {
    urlParams.append('q', query);
    path += urlParams.toString();
  }

  try {
    const response = await axiosInstance.get(path, {
      headers: {
        Accept: 'application/json'
      },
      signal: controller.signal
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchUniversities;
