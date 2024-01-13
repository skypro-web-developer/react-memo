const baseUrl = "https://wedev-api.sky.pro/api/leaderboard";

export const getLeaders = async () => {
  const response = await fetch(baseUrl);
  const json = await response.json();
  return json;
};
