import styles from "./keyboard.module.css";

interface KeyboardProps {
  onNumberClick: (num: number) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ onNumberClick }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className={styles.containerNumber}>
      {numbers.map((num, index) => (
        <button
          key={index}
          className={styles.number}
          onClick={() => onNumberClick(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
