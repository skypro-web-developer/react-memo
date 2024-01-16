export async function getLeaders() {
  const response = await fetch("https://wedev-api.sky.pro/api/v2/leaderboard");
  const leaders = await response.json();
  console.log(leaders);
  return leaders;
}

export async function addLeader({ name, time, achievements }) {
  const response = await fetch("https://wedev-api.sky.pro/api/v2/leaderboard", {
    method: "POST",
    body: JSON.stringify({ name, time, achievements }),
  });
  const newLeaders = await response.json();
  return newLeaders;
}
