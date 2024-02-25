const API_URL = "https://wedev-api.sky.pro/api/leaderboard";
export async function getLeaderBoard() {
  const response = await fetch(API_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const date = await response.json();
  return date;
}

export async function postLeaderBoard() {
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      login,
      name,
      password,
    }),
  });

  const user = await response.json();
  return user;
}
