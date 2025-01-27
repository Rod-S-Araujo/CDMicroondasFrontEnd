"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import Keyboard from "@/componnents/keyboard/intex";
import Microwave from "@/componnents/microwave";
import ContainerCookModels from "@/componnents/containerCookModels";
import { useCookModel } from "@/componnents/context/cookModelContext";

export default function Home() {
  const { modelSelected } = useCookModel();
  const [wavesArray, setWavesArray] = useState<string[]>([]);

  const [timeValue, setTimeValue] = useState<string>("0");
  const [powerValue, setPowerValue] = useState<number>(10);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [countdownActive, setCountdownActive] = useState<boolean>(false);
  const [isInvalidTime, setisInvalidTime] = useState<boolean>(false);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef<number | null>(remainingTime);

  useEffect(() => {
    remainingTimeRef.current = remainingTime;
  }, [remainingTime]);

  useEffect(() => {
    if (modelSelected) {
      setPowerValue(modelSelected.potencia);
      setTimeValue((modelSelected.tempo * 100).toString());
    } else {
      setPowerValue(10);
      setTimeValue("0");
    }
  }, [modelSelected]);

  useEffect(() => {
    if (countdownActive && remainingTime !== null) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (remainingTimeRef.current && remainingTimeRef.current > 0) {
            return prev! - 1;
          } else {
            clearInterval(intervalRef.current!);
            setCountdownActive(false);
            return 0;
          }
        });
        if (remainingTime != 0) {
          setWavesArray((prevArray) => [
            ...prevArray,
            (modelSelected ? modelSelected.stringAquecimento : ".").repeat(
              powerValue
            ),
          ]);
        }
        setTimeValue(remainingTime.toString());
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [countdownActive, remainingTime]);

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
  const [minutes, seconds] = timeFormated.split(":").map(Number);
  const totalSeconds = minutes * 60 + seconds;

  useEffect(() => {
    setProgress(
      Math.round(((totalTime - parseInt(timeValue)) / totalTime) * 100)
    );
    console.log(progress, timeValue, totalTime);
  }, [timeValue]);

  const startCountdown = () => {
    if (modelSelected && countdownActive) {
    } else if (countdownActive) {
      setRemainingTime((prev) => (prev !== null ? prev + 30 : 30));
      setTotalTime((prev) => (prev !== null ? prev + 30 : 30));
    } else if (totalSeconds > 0) {
      setRemainingTime(totalSeconds);
      setCountdownActive(true);
      setTotalTime(totalSeconds);
    } else {
      setRemainingTime(30);
      setCountdownActive(true);
      setTotalTime(30);
    }
  };

  const handleNumberCLick = (num: number) => {
    setTimeValue((prev) => {
      if (prev === "0") {
        return `${num}`;
      }
      return `${prev}${num}`;
    });
  };

  const handlePowerClick = (num: number) => {
    setPowerValue(num);
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

  const pauseCancel = () => {
    if (countdownActive) {
      setCountdownActive(false);
    } else {
      setWavesArray([]);
      setTimeValue("0");
    }
  };

  useEffect(() => {
    if ((totalSeconds >= 0 && totalSeconds <= 120) || modelSelected) {
      setisInvalidTime(false);
    } else {
      setisInvalidTime(true);
    }
  }, [totalSeconds]);

  return (
    <main className={styles.body}>
      <div className={styles.containerMenu}>
        <div className={styles.containerVisor}>
          <div>
            <h6>Tempo</h6>
            <h5>
              {countdownActive ? formatTime(remainingTime || 0) : timeFormated}
            </h5>
          </div>
          <div>
            <h6>Potencia</h6>
            <h5>{powerValue}</h5>
          </div>
        </div>
        {isInvalidTime ? (
          <div className={styles.containerError}>
            <h5>ERROR</h5>
            <h6>
              Digite um tempo valido, entre 1 segundo e 2 minutos para produtos
              sem preparação pré definida
            </h6>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.containerBoard}>
          <input
            className={styles.timeInput}
            type="number"
            value={timeValue}
            onChange={handleInputChange}
          />
          {modelSelected ? (
            <span className={styles.block}>
              <h5>
                Não é permitido alterar informações de padrões pré definidos
              </h5>
            </span>
          ) : (
            <></>
          )}
          <Keyboard onNumberClick={handleNumberCLick} />
          <div className={styles.containerButtons}>
            <button
              className={styles.buttonKeyboard}
              onClick={() =>
                setTimeValue((prev) =>
                  prev.length > 1 ? prev.slice(0, -1) : "0"
                )
              }
            >
              <h5>Apagar</h5>
            </button>
            <button
              className={styles.buttonKeyboard}
              onClick={() =>
                setPowerValue((prev) => (prev < 10 ? prev + 1 : 1))
              }
            >
              <h5>Potencia</h5>
              <h6>Alterar</h6>
            </button>
            <button
              className={styles.buttonKeyboard}
              type="button"
              onClick={startCountdown}
            >
              <h5>Iniciar</h5>
              <h6>+30 seg</h6>
            </button>
            <button className={styles.buttonKeyboard} onClick={pauseCancel}>
              <h5>Pausar</h5>
              <h6>/Cancelar</h6>
            </button>
          </div>
        </div>
      </div>
      <Microwave
        wavesArray={wavesArray}
        countdownActive={countdownActive}
        progress={progress}
      />
      <ContainerCookModels
        tempo={timeFormated}
        potencia={powerValue}
        onNumberClick={handleNumberCLick}
        onPowerClick={handlePowerClick}
      />
    </main>
  );
}
