export async function getLeaders() {
  return await fetch("http://localhost:3000/api/leaderboard").then(res => res.json());
}

export async function addLeader({ name, time }) {
  return await fetch("http://localhost:3000/api/leaderboard", {
    method: "POST",
    body: JSON.stringify({ name, time }),
  }).then(res => res.json());
}
