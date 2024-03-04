import { useEffect, useState } from "react";
import styles from "./loader.module.scss";

export default function Loader({
  isActive,
}: {
  isActive: boolean;
}): React.JSX.Element {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRendered(isActive);
    }, 10);

    return () => setRendered(false);
  }, [isActive]);

  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
      <div
        className={`${styles.loader_background} ${
          rendered ? styles.loader_active : styles.loader_inactive
        }`}
      ></div>
      <span className={`${styles.loader}`} />
    </div>
  );
}
