export async function getLeaders() {
  const response = await fetch("https://wedev-api.sky.pro/api/leaderboard");
  const leaders = await response.json();
  console.log(leaders);
  return leaders;
}

export async function addLeader({ name, time }) {
  const response = await fetch("https://wedev-api.sky.pro/api/leaderboard", {
    method: "POST",
    body: JSON.stringify({ name, time }),
  });
  const newLeaders = await response.json();
  return newLeaders;
}
