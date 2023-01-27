const getFavoriteAndActive = (user, university, id) => {
  const isFavorite = user.universities.some((uni) => uni.id === id);
  const isActive = university?.id === id;

  return {
    isFavorite,
    isActive
  };
};

export default getFavoriteAndActive;
