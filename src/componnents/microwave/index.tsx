import styles from "./microwave.module.css";

interface microwaveProps {
  wavesArray: string[];
  countdownActive: boolean;
}

const Microwave = ({ wavesArray, countdownActive }: microwaveProps) => {
  return (
    <div className={styles.containerMicrowave}>
      <div className={styles.microwaveCavity}>
        {countdownActive ? <span className={styles.light}></span> : <></>}
        <ul className={styles.loadingBar}>
          {wavesArray.map((wave, index) => (
            <li key={index} className={styles.wave}>
              <p>{wave}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Microwave;
