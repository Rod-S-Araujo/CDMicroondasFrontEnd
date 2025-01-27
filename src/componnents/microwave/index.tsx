import styles from "./microwave.module.css";

interface microwaveProps {
  wavesArray: string[];
  countdownActive: boolean;
  progress: number;
}

const Microwave = ({
  wavesArray,
  countdownActive,
  progress,
}: microwaveProps) => {
  return (
    <div className={styles.containerMicrowave}>
      <div className={styles.box}>
        <ul className={styles.microwaveCavity}>
          {countdownActive ? <span className={styles.light}></span> : <></>}
          {wavesArray.map((wave, index) => (
            <li key={index} className={styles.wave}>
              <p>{wave}</p>
            </li>
          ))}
        </ul>
        {countdownActive ? (
          <div className={styles.loadingBar}>
            <span
              className={styles.progress}
              style={{ width: `${progress}%` }}
            ></span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Microwave;
