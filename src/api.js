const url = "https://wedev-api.sky.pro/api/leaderboard";
export const getLeaders = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("error");
  }
  const data = await response.json();
  return data.leaders;
};

export const addLeader = async ({ name, time }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      name,
      time,
    }),
  });
  if (!response.ok) {
    throw new Error("error");
  }
};
