import axios from "axios";

const getFavorites = async (setMyFavorites) => {
  const res = await axios.get("http://localhost:3000/favorites");
  setMyFavorites(res.data);
};
export default getFavorites;
