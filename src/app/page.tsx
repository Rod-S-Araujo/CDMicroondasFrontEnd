"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Keyboard from "@/componnents/keyboard/intex";

export default function Home() {
  const [timeValue, setTimeValue] = useState<string>("0");
  const [powerValue, setPowerValue] = useState<number>(10);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [countdownActive, setCountdownActive] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdownActive && remainingTime !== null) {
      timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev && prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer!);
            setCountdownActive(false);
            return 0;
          }
        });
        setTimeValue(remainingTime.toString());
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdownActive, remainingTime]);

  const startCountdown = () => {
    const totalSeconds = parseInt(timeFormated.replace(":", ""), 10);
    console.log(totalSeconds);
    if (totalSeconds > 0) {
      setRemainingTime(totalSeconds);
      setCountdownActive(true);
    } else if (totalSeconds === 0 && setCountdownActive(true)) {
      setRemainingTime(() => totalSeconds + 30);
      setCountdownActive(true);
    }
  };

  const timeFormated = (() => {
    const totalSeconds = parseInt(timeValue, 10) || 0;
    const timeSeconds = timeValue.slice(-2);
    const timeSecondInt = parseInt(timeSeconds);
    if (timeSecondInt >= 60) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    } else {
      const minutes = timeValue.slice(0, -2);
      const seconds = timeSecondInt;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    }
  })();

  const handleNumberCLick = (num: number) => {
    setTimeValue((prev) => {
      if (prev === "0") {
        return `${num}`;
      }
      return `${prev}${num}`;
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setTimeValue(value);
    }
  };

  return (
    <div>
      <div>
        <div>
          <p>Tempo selecionado</p>
          <h4>
            {countdownActive ? formatTime(remainingTime || 0) : timeFormated}
          </h4>
        </div>
        <div>
          <p>Potencia</p>
          <h4>{powerValue}</h4>
        </div>
      </div>
      <div>
        <h3>ERROR</h3>
      </div>
      <div className={styles.containerMenu}>
        <h5>
          Digite o tempo necessário para o preparo ou tecle com os digitos
          abaixo
        </h5>
        <input type="number" value={timeValue} onChange={handleInputChange} />
        <Keyboard onNumberClick={handleNumberCLick} />
        <div className={styles.containerButtons}>
          <button
            className={styles.buttonKeyboard}
            onClick={() => setTimeValue("0")}
          >
            Zerar
          </button>
          <button
            className={styles.buttonKeyboard}
            onClick={() =>
              setTimeValue((prev) =>
                prev.length > 1 ? prev.slice(0, -1) : "0"
              )
            }
          >
            Apagar
          </button>
        </div>
        <div>
          <button
            className={styles.buttonKeyboard}
            onClick={() => setPowerValue((prev) => (prev < 10 ? prev + 1 : 0))}
          >
            Potencia
          </button>
          <button
            className={styles.buttonKeyboard}
            type="button"
            onClick={startCountdown}
          >
            Iniciar
          </button>
        </div>
      </div>
    </div>
  );
}
