export async function getLeaders({ setLeadersList }) {
  const response = await fetch("https://wedev-api.sky.pro/api/leaderboard", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }

  const data = await response.json();
  const sortList = data.leaders.sort((a, b) => (a.time > b.time ? 1 : -1));
  setLeadersList(sortList);
  return sortList;
}

export async function postLeaders({ dataNewLeader }, setLeadersList) {
  console.log(dataNewLeader);
  const response = await fetch("https://wedev-api.sky.pro/api/leaderboard", {
    body: JSON.stringify({ name: dataNewLeader.name, time: dataNewLeader.time }),
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Ошибка сервера");
  }

  const data = await response.json();
  console.log(data.leaders);
  const sortList = data.leaders.sort((a, b) => (a.time > b.time ? 1 : -1));
  setLeadersList(sortList);
  return sortList;
}
