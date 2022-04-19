import axios from "axios";

const API_URL = "https://api.github.com/users/";

const getUserInfo = async (user: string) => {
  const response = await axios.get(API_URL + user);
  const { login, name, location, public_repos, created_at, avatar_url } =
    response.data;
  return { login, name, location, public_repos, created_at, avatar_url };
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
