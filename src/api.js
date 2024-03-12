const url = "https://wedev-api.sky.pro/api/v2/leaderboard";
export const getLeaders = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("error");
  }
  const data = await response.json();
  return data.leaders;
};

export const addLeader = async ({ name, time, achievements }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name,
      time,
      achievements,
    }),
  });
  if (!response.ok) {
    throw new Error("error");
  }
};
