const host = "https://wedev-api.sky.pro/api/v2/leaderboard";

export async function getLeaderList() {
  const response = await fetch(host, { method: "GET" });

  if (!response.status === 200) {
    throw new Error("Ошибка получения");
  }

  const data = await response.json();
  return data;
}

export async function postLeader({ nameUser, time }) {
  const response = await fetch(host, {
    method: "POST",
    body: JSON.stringify({
      name: nameUser.value,
      time: time,
    }),
  });

  if (!response.status === 201) {
    throw new Error("Ошибка отправки");
  }

  const data = await response.json();
  return data;
}
