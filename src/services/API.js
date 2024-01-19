const baseUrl = "https://wedev-api.sky.pro/api/v2/leaderboard";

export const getLeaders = async () => {
  try {
    const response = await fetch(baseUrl);
    console.log("response", response);
    if (!response) throw new Error("Нет интернета");
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const sendLeader = async ({ name, time, achievements }) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      body: JSON.stringify({ name, time, achievements }),
    });
    console.log(response);
  } catch (error) {
    console.warn(error);
  }
};
