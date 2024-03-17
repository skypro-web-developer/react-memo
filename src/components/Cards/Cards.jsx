import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import { generateDeck } from "../../utils/cards";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { removeAttempts, updateAttempts } from "../../store/slices";
import { attemptForms, wordEndingChanger } from "../../helpers";
import { getAllScore } from "../../api";

// Игра закончилась
const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
// Идет игра: карты закрыты, игрок может их открыть
const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";
// Начало игры: игрок видит все карты в течении нескольких секунд
const STATUS_PREVIEW = "STATUS_PREVIEW";

function getTimerValue(startDate, endDate) {
  if (!startDate && !endDate) {
    return {
      minutes: 0,
      seconds: 0,
    };
  }

  if (endDate === null) {
    endDate = new Date();
  }

  const diffInSecconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
  const minutes = Math.floor(diffInSecconds / 60);
  const seconds = diffInSecconds % 60;
  return {
    minutes,
    seconds,
  };
}

/**
 * Основной компонент игры, внутри него находится вся игровая механика и логика.
 * pairsCount - сколько пар будет в игре
 * previewSeconds - сколько секунд пользователь будет видеть все карты открытыми до начала игры
 */
export function Cards({ pairsCount = 3, previewSeconds = 5 }) {
  const dispatch = useDispatch();
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([]);
  // Текущий статус игры
  const [status, setStatus] = useState(STATUS_PREVIEW);

  // Дата начала игры
  const [gameStartDate, setGameStartDate] = useState(null);
  // Дата конца игры
  const [gameEndDate, setGameEndDate] = useState(null);

  // Стейт для таймера, высчитывается в setInteval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });

  // количество оставшихся попыток
  const attempts = useSelector(store => store.game.attempts);

  // Статус режима игры до трех ошибок
  const isEasyMode = useSelector(store => store.game.isEasyMode);

  // Если допущено 3 ошибки, игра заканчивается
  useEffect(() => {
    if (attempts === 0) {
      finishGame(STATUS_LOST);
    }
  });

  function finishGame(status = STATUS_LOST) {
    dispatch(removeAttempts());
    setGameEndDate(new Date());
    setStatus(status);
  }
  function startGame() {
    const startDate = new Date();
    setGameEndDate(null);
    setGameStartDate(startDate);
    setTimer(getTimerValue(startDate, null));
    setStatus(STATUS_IN_PROGRESS);
  }
  function resetGame() {
    dispatch(removeAttempts());
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setStatus(STATUS_PREVIEW);
  }

  /**
   * Обработка основного действия в игре - открытие карты.
   * После открытия карты игра может пепереходит в следующие состояния
   * - "Игрок выиграл", если на поле открыты все карты
   * - "Игрок проиграл", если на поле есть две открытые карты без пары
   * - "Игра продолжается", если не случилось первых двух условий
   */
  const openCard = clickedCard => {
    // Если карта уже открыта, то ничего не делаем
    if (clickedCard.open) {
      return;
    }
    // Игровое поле после открытия кликнутой карты
    const nextCards = cards.map(card => {
      if (card.id !== clickedCard.id) {
        return card;
      }

      return {
        ...card,
        open: true,
      };
    });

    setCards(nextCards);

    const isPlayerWon = nextCards.every(card => card.open);

    // Победа - все карты на поле открыты
    if (isPlayerWon) {
      finishGame(STATUS_WON);
      return;
    }

    // Открытые карты на игровом поле
    const openCards = nextCards.filter(card => card.open);

    // Ищем открытые карты, у которых нет пары среди других открытых
    const openCardsWithoutPair = openCards.filter(card => {
      const sameCards = openCards.filter(openCard => card.suit === openCard.suit && card.rank === openCard.rank);

      if (sameCards.length < 2) {
        return true;
      }

      return false;
    });

    const playerLost = openCardsWithoutPair.length >= 2;

    // Если на поле 2 открытые карты без пары - Обычный режим: "Игрок проиграл". Облегченный режим: "Игра продолжается"
    if (playerLost) {
      dispatch(updateAttempts());

      if (!isEasyMode) {
        finishGame(STATUS_LOST);
      } else {
        const updatedCards = nextCards.map(card => {
          if (openCardsWithoutPair.some(openCard => openCard.id === card.id)) {
            if (card.open) {
              setTimeout(() => {
                setCards(prevCards => {
                  const updated = prevCards.map(cardId =>
                    cardId.id === card.id ? { ...cardId, open: false } : cardId,
                  );
                  return updated;
                });
              }, 1000);
            }
          }
          return card;
        });
        setCards(updatedCards);
      }
      return;
    }
  };

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

  const [isLeader, setIsLeader] = useState(false);
  const currentLevel = useSelector(store => store.game.currentLevel);

  useEffect(() => {
    if (status === STATUS_WON && currentLevel === 3) {
      getAllScore()
        .then(data => {
          const leaders = data.leaders; // Получаем список лидеров из API
          console.log("Все лидеры:", leaders);
          const timeLastLeaders = leaders.reduce((maxTime, leader) => {
            return Math.max(maxTime, leader.time);
          }, 0);
          console.log("Время последнего лидера:", timeLastLeaders);

          const { minutes, seconds } = timer;
          const userTime = minutes * 60 + seconds;
          console.log("Таймер пользователя:", userTime);
          if (timeLastLeaders > userTime || leaders.length < 10) {
            setIsLeader(true);
            console.log("Пользователь - лидер!");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [status, currentLevel]);

  // Игровой цикл
  useEffect(() => {
    // В статусах кроме превью доп логики не требуется
    if (status !== STATUS_PREVIEW) {
      return;
    }

    // В статусе превью мы
    if (pairsCount > 36) {
      alert("Столько пар сделать невозможно");
      return;
    }

    setCards(() => {
      return shuffle(generateDeck(pairsCount, 10));
    });

    const timerId = setTimeout(() => {
      startGame();
    }, previewSeconds * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [status, pairsCount, previewSeconds]);

  // Обновляем значение таймера в интервале
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(getTimerValue(gameStartDate, gameEndDate));
    }, 300);
    return () => {
      clearInterval(intervalId);
    };
  }, [gameStartDate, gameEndDate]);

  const attemptsText = wordEndingChanger.changeEnding(attempts, attemptForms);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.timerContainer}>
          {status === STATUS_PREVIEW ? (
            <div>
              <p className={styles.previewText}>Запоминайте пары!</p>
              <p className={styles.previewDescription}>Игра начнется через {previewSeconds} секунд</p>
            </div>
          ) : (
            <>
              <div className={styles.timer}>
                <div className={styles.timerValue}>
                  <div className={styles.timerDescription}>min</div>
                  <div>{timer.minutes.toString().padStart("2", "0")}</div>
                </div>
                .
                <div className={styles.timerValue}>
                  <div className={styles.timerDescription}>sec</div>
                  <div>{timer.seconds.toString().padStart("2", "0")}</div>
                </div>
              </div>
              {isEasyMode && status === STATUS_IN_PROGRESS ? (
                <div className={styles.attempts}>
                  <p>
                    Осталось <span>{attempts}</span>
                    {attemptsText}
                  </p>
                </div>
              ) : null}
            </>
          )}
        </div>
        {status === STATUS_IN_PROGRESS ? <Button onClick={resetGame}>Начать заново</Button> : null}
      </div>

      <div className={styles.cards}>
        {cards.map(card => (
          <Card
            key={card.id}
            onClick={() => openCard(card)}
            open={status !== STATUS_IN_PROGRESS ? true : card.open}
            suit={card.suit}
            rank={card.rank}
          />
        ))}
      </div>

      {isGameEnded ? (
        <div className={styles.modalContainer}>
          <EndGameModal
            isWon={status === STATUS_WON}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
            isLeader={isLeader}
          />
        </div>
      ) : null}
    </div>
  );
}
