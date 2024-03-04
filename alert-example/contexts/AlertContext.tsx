"use client";
import { type ToastIcon } from "@/components/1-atoms/a_toast";
import AlertModal, {
  type AlertTypes,
  type IAlertModalRef,
} from "@/components/2-blocks/b_alertModal";
import ToastContainer, {
  type IToastRef,
} from "@/components/2-blocks/b_toastContainer";
import { createContext, useRef } from "react";

interface IAlertContext {
  CreateToast: (message: string, icon: ToastIcon, timer?: number) => void;
  ShowModal: (
    title: string,
    message: string,
    buttonText: string,
    alertType: AlertTypes
  ) => void;
}

export const AlertContext = createContext<IAlertContext>({
  CreateToast: () => {},
  ShowModal: () => {},
});

export default function AlertProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const modal = useRef<IAlertModalRef>(null);
  const toasts = useRef<IToastRef>(null);

  const CreateToast = (
    message: string,
    icon: ToastIcon,
    timer?: number
  ): void => {
    if (toasts.current)
      toasts.current.onAddToast({
        icon,
        message,
        timer,
      });
  };

  const ShowModal = (
    title: string,
    message: string,
    buttonText: string,
    alertType: AlertTypes
  ): void => {
    if (modal.current)
      modal.current.OnShow(title, message, buttonText, alertType);
  };

  return (
    <AlertContext.Provider
      value={{
        CreateToast,
        ShowModal,
      }}
    >
      <AlertModal ref={modal} />
      <ToastContainer ref={toasts} />
      {children}
    </AlertContext.Provider>
  );
}
