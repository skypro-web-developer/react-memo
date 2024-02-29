const API_URL = "https://wedev-api.sky.pro/api/leaderboard";
export async function getLeaderBoard() {
  const response = await fetch(API_URL, {
    method: "GET",
  });

  const date = await response.json();
  return date;
}

export async function postLeaderBoard({ time, name }) {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      time,
      name,
    }),
  });

  const user = await response.json();
  return user;
}
