import { shuffle } from "lodash";
import { useEffect, useRef, useState } from "react";
import { generateDeck } from "../../utils/cards";
import styles from "./Cards.module.css";
import { EndGameModal } from "../../components/EndGameModal/EndGameModal";
// import { Button } from "../../components/Button/Button";
import { Card } from "../../components/Card/Card";
import { getLeaders } from "../../services/API";
import { getTimeInSeconds, sortLeadersByTime } from "../../utils/helpers";
import { Header } from "../Header/Header";

const STATUS_LOST = "STATUS_LOST";
const STATUS_WON = "STATUS_WON";
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

export function Cards({ pairsCount = 3, previewSeconds = 5, isEasyMode }) {
  // В cards лежит игровое поле - массив карт и их состояние открыта\закрыта
  const [cards, setCards] = useState([]);
  const [status, setStatus] = useState(STATUS_PREVIEW);
  const [isOnLeaderboard, setIsOnLeaderboard] = useState(false);

  const [gameStartDate, setGameStartDate] = useState(null);
  const [gameEndDate, setGameEndDate] = useState(null);
  const [previousCards, setPreviousCards] = useState(cards);
  // Количество попыток
  const [tryes, setTryes] = useState(3);
  // Использовались ли суперспособности
  const [wasPowUsed, setWasPowUsed] = useState(false);
  // Стейт для таймера, высчитывается в setInteval на основе gameStartDate и gameEndDate
  const [timer, setTimer] = useState({
    seconds: 0,
    minutes: 0,
  });

  const intervalID = useRef(0);

  function finishGame(status = STATUS_LOST) {
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
    setGameStartDate(null);
    setGameEndDate(null);
    setTimer(getTimerValue(null, null));
    setStatus(STATUS_PREVIEW);
    setTryes(3);
    setIsOnLeaderboard(false);
    setWasPowUsed(false);
  }

  function aloha() {
    const closedCards = cards.filter(card => card.open === false);
    const randomCard = closedCards[Math.floor(Math.random() * closedCards.length)];
    const newCards = cards.map(card =>
      card.rank === randomCard.rank && card.suit === randomCard.suit ? { ...card, open: true } : card,
    );

    setWasPowUsed(true);
    setCards(newCards);

    if (newCards.every(card => card.open)) {
      defineIsOnLeaderBoard();
      finishGame(STATUS_WON);
    }
  }

  function insight() {
    const currentCards = [...cards];
    const openedCards = currentCards.map(card => ({ ...card, open: true }));
    setCards(openedCards);
    clearInterval(intervalID.current);
    setWasPowUsed(true);

    setTimeout(() => {
      setGameStartDate(new Date(gameStartDate.getTime() + 5000));
      setCards(currentCards);
    }, 5000);
  }

  async function defineIsOnLeaderBoard() {
    const leaders = await getLeaders();
    const sortedLeaders = sortLeadersByTime(leaders.leaders);
    const leadersLength = sortedLeaders.length;
    const isLeadResult = sortedLeaders[leadersLength - 1].time > getTimeInSeconds(timer) && pairsCount === 9;

    setIsOnLeaderboard(isLeadResult);
  }

  const openCard = async clickedCard => {
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

    const prevCards = [...cards];

    setCards(nextCards);

    const isPlayerWon = nextCards.every(card => card.open);

    // Победа - все карты на поле открыты
    if (isPlayerWon) {
      defineIsOnLeaderBoard();
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

    // "Игрок проиграл", т.к на поле есть две открытые карты без пары

    if (isEasyMode && playerLost) {
      setTryes(tryes - 1);
      setCards(nextCards);
      setTimeout(() => {
        if (tryes <= 1) finishGame(STATUS_LOST);
        setCards(previousCards);
      }, 500);
      return;
    }

    if (tryes < 1) finishGame(STATUS_LOST);

    if (playerLost) {
      finishGame(STATUS_LOST);

      return;
    }
    setPreviousCards(prevCards);
    // ... игра продолжается
  };

  const isGameEnded = status === STATUS_LOST || status === STATUS_WON;

  isGameEnded && clearInterval(intervalID.current);

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
    intervalID.current = setInterval(() => {
      setTimer(getTimerValue(gameStartDate, gameEndDate));
    }, 250);
    return () => {
      clearInterval(intervalID.current);
    };
  }, [gameStartDate, gameEndDate]);

  return (
    <div className={styles.container}>
      <Header
        status={status}
        timer={timer}
        isEasyMode={isEasyMode}
        previewSeconds={previewSeconds}
        resetGame={resetGame}
        tryes={tryes}
        aloha={aloha}
        insight={insight}
      />

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
            isOnLeaderboard={isOnLeaderboard}
            wasPowUsed={wasPowUsed}
            gameDurationSeconds={timer.seconds}
            gameDurationMinutes={timer.minutes}
            onClick={resetGame}
          />
        </div>
      ) : null}
    </div>
  );
}
