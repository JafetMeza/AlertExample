import ButtonIcon from "@/components/1-atoms/a_ButtonIcon";
import styles from "./alertModal.module.scss";
import { GetAlertModalValues, type IAlertModal } from "./helper";
import { forwardRef, useImperativeHandle, useState } from "react";
import Icon from "@/components/1-atoms/a_icon";

export enum AlertTypes {
  delete = 0,
  warning = 1,
  danger = 2,
  success = 3,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AlertModalProps {}
interface IAlertModalData {
  active: boolean;
  title: string;
  message: string;
  buttonText: string;
  alertType: AlertTypes;
}

export interface IAlertModalRef {
  OnShow(
    title: string,
    message: string,
    buttonText: string,
    alertType: AlertTypes
  ): void;
  active: boolean;
}

const AlertModal = forwardRef<IAlertModalRef, AlertModalProps>((_, ref) => {
  const [alertObject, setAlertObject] = useState<IAlertModal | null>(null);
  const [modal, setModal] = useState<IAlertModalData>({
    active: false,
    title: "",
    message: "",
    buttonText: "",
    alertType: AlertTypes.delete,
  });
  const [active, setActive] = useState(false);

  const onCloseModal = (): void => {
    setModal({ ...modal, active: false });
    setTimeout(() => setActive(false), 300);
  };

  useImperativeHandle(ref, () => ({
    OnShow(
      title: string,
      message: string,
      buttonText: string,
      alertType: AlertTypes
    ) {
      setActive(true);
      setTimeout(() => {
        setAlertObject(GetAlertModalValues(alertType));
        setModal({ title, message, buttonText, alertType, active: true });
      }, 300);
    },
    active: modal.active,
  }));

  return (
    <div
      className={`modal ${styles.modal} ${active ? `is-active` : ""} ${
        !modal.active ? styles.desactive : ""
      }`}
    >
      <div className="modal-background" onClick={onCloseModal} />
      <div className={`modal-content ${styles.modal_content}`}>
        <div
          className={`card ${styles.card} ${modal.active ? styles.active : ""}`}
        >
          <div className={styles.close_button}>
            <ButtonIcon
              icon="times"
              name="close"
              className={""}
              onClick={onCloseModal}
            />
          </div>
          <div className={`card-content`}>
            <div className="is-flex is-flex-direction-column is-align-items-center">
              <Icon icon={alertObject ? alertObject.icon : ""} />
              <h4 className="title is-4">{modal.title}</h4>
              <p>{modal.message}</p>
            </div>
            <div className="is-flex is-flex-direction-row-reverse mt-5">
              <button className={`button ${alertObject?.className}`}>
                {modal.buttonText}
              </button>
              <button className="button mr-5" onClick={onCloseModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AlertModal;
