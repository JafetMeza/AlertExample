import { useEffect, useRef, useState } from "react";
import { getColor, getIcon } from "./helper";
import styles from "./toast.module.scss";
import useMounted from "@/components/hooks/useMounted";

export enum ToastIcon {
  info = 0,
  warning = 1,
  error = 2,
  success = 3,
}

export interface IToastProps {
  id: string;
  message: string;
  icon: ToastIcon;
  timer?: number;
  OnDisappear(id: string): void;
}

export default function Toast({
  id,
  message,
  icon,
  timer = 5,
  OnDisappear = () => {},
}: IToastProps): React.JSX.Element {
  const barDiv = useRef<HTMLDivElement>(null);
  const [rendered, setRendered] = useState(false);
  const [active, setActive] = useState(false);
  const [counter, setCounter] = useState<number>(0);
  const [intervalCounter, setIntervalCounter] = useState<number | null>(null);
  const mounted = useMounted();

  useEffect(() => {
    if (mounted) {
      setTimeout(() => setActive(true), 10);
      CreateInterval();

      if (barDiv.current) barDiv.current.style.background = getColor(icon);
    }
  }, [mounted]);

  useEffect(() => {
    const percentage = (counter * 100) / (timer * 1000);
    if (mounted && percentage === 100) {
      OnDesactive();
      DestroyInterval();
    }
    if (barDiv.current) barDiv.current.style.width = `${percentage}%`;
  }, [mounted, counter]);

  const OnDesactive = (): void => {
    setActive(false);
    setTimeout(() => setRendered(true), 400);
  };

  const OnClick = (): void => OnDesactive();

  const DestroyInterval = (): void => {
    if (intervalCounter) {
      window.clearInterval(intervalCounter);
    }
    setIntervalCounter(null);
  };

  const CreateInterval = (): void =>
    setIntervalCounter(
      window.setInterval(() => setCounter((c) => (c += 100)), 100)
    );

  useEffect(() => {
    if (rendered) OnDisappear(id);
  }, [rendered]);

  return (
    <div
      className={`${styles.toast} ${
        active ? styles.toast_ready : styles.toast_remove
      } ${rendered ? styles.toast_none : ""}`}
    >
      <button
        aria-label="deleteToastButton"
        name="deleteToastButton"
        className={`delete ${styles.delete}`}
        onClick={OnClick}
      />
      <div
        className={`columns ${styles.toast_content}`}
        onMouseEnter={DestroyInterval}
        onMouseLeave={CreateInterval}
      >
        <div className={`column is-one-quarter ${styles.icon}`}>
          <span className={`icon `}>
            <i
              className={`fas fa-${getIcon(icon).icon} ${getIcon(icon).color}`}
            ></i>
          </span>
        </div>
        <div className={`column content is-flex is-align-items-center mr-3`}>
          <p>{message}</p>
        </div>
      </div>
      <div className={styles.loading_bar} ref={barDiv} />
    </div>
  );
}
