import axios from "axios";

const API_URL = "https://api.github.com/users/";

const getUserInfo = async (user: string) => {
  const response = await axios.get(API_URL + user);
  return response.data;
};

const getUserRepos = async (user: string) => {
  const response = await axios.get(API_URL + user + "/repos");
  return response.data;
};

const profileService = {
  getUserInfo,
  getUserRepos,
};

export default profileService;
