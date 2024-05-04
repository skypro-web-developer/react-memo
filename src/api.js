export function getAllScore() {
  return fetch("https://wedev-api.sky.pro/api/leaderboard")
      .then(response => {
        if (!response.ok) {
          throw new Error("Произошла ошибка сервера, попробуйте позже");
        }
        return response.json();
      })
      .catch(error => {
        console.error("Ошибка при получении данных лидерборда:", error);
        throw error;
      });
  }
  
  export function postUserScore({ name, time }) {
    return fetch("https://wedev-api.sky.pro/api/leaderboard", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        time: time,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Произошла ошибка сервера при отправке данных");
        }
      })
      .catch(error => {
        console.error("Ошибка при отправке данных лидерборда:", error);
        throw error;
      });
  }