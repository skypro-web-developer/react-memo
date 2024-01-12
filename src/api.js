const host = "https://wedev-api.sky.pro/api/leaderboard";

export function getLeaders() {
  return fetch(host).then(response => {
    if (!response.ok) {
      console.log("Что-то пошло не так");
    } else {
      return response.json();
    }
  });
}

export function addLeader({ name, time }) {
  return fetch(host, { method: "POST", body: JSON.stringify({ name: name, time: time }) }).then(response => {
    if (!response.ok) {
      console.log("Что-то пошло не так");
    }
  });
}
