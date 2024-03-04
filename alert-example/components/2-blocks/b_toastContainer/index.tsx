import Toast, { type ToastIcon } from "@/components/1-atoms/a_toast";
import styles from "./toastContainer.module.scss";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface IToast {
  id?: string;
  icon: ToastIcon;
  message: string;
  timer?: number;
}

export interface IToastRef {
  onAddToast(toast: IToast): void;
}

const ToastContainer = forwardRef<IToastRef, any>((_, ref) => {
  const removedToast = useRef<IToast[]>([]);
  const [listToast, setListToast] = useState<IToast[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useImperativeHandle(ref, () => ({
    onAddToast(toast: IToast) {
      toast.id = crypto.randomUUID();
      setListToast([...listToast, toast]);
    },
  }));

  const WaitForAnyCalling = (): void => {
    const t = setTimeout(() => {
      if (removedToast.current.length === listToast.length) setListToast([]);
      else WaitForAnyCalling();
    }, 5000);

    setTimer(t);
  };

  const onDisappear = (id: string): void => {
    const toast = listToast.find((t) => t.id === id);
    if (toast) removedToast.current = [...removedToast.current, toast];
    clearTimeout(timer);
    WaitForAnyCalling();
  };

  return (
    <div className={styles.content}>
      {listToast.map((item, index) => (
        <Toast
          key={index}
          id={item.id ?? ""}
          message={item.message}
          icon={item.icon}
          timer={item.timer}
          OnDisappear={onDisappear}
        />
      ))}
    </div>
  );
});

export default ToastContainer;
