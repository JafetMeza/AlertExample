import styles from "./radioButton.module.scss";

export interface RadioButtonProps {
  data: string[];
  onClick(value: string, name: string): void;
  name: string;
  defaultValue?: string;
  className?: string;
}

export default function RadioButton({
  data,
  onClick,
  name,
  defaultValue,
  className,
}: RadioButtonProps): React.JSX.Element {
  return (
    <div className={`control ${className}`}>
      {data.map((item, index) => (
        <label
          className={`radio ${styles.radioButton_contentLabel} ${
            index === 0 && styles.radio_margin
          }`}
          key={index}
        >
          <input
            type="radio"
            name={name}
            className={styles.radioButton_contentInput}
            onClick={(e) => {
              const target = e.target as HTMLInputElement;
              onClick(target.value, name);
            }}
            value={item}
            defaultChecked={defaultValue === item}
          />
          {item}
        </label>
      ))}
    </div>
  );
}
