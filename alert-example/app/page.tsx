"use client";
import ButtonIcon from "@/components/1-atoms/a_ButtonIcon";
import Input from "@/components/1-atoms/a_input";
import RadioButton from "@/components/1-atoms/a_radioButton";
import { ToastIcon } from "@/components/1-atoms/a_toast";
import { AlertContext } from "@/contexts/AlertContext";
import { useContext, useRef, useState } from "react";

export default function Home(): React.JSX.Element {
  const input = useRef<HTMLInputElement>(null);
  const { CreateToast } = useContext(AlertContext);
  const EmptyString: string = "";
  const [error, setError] = useState(EmptyString);
  const [icon, setIcon] = useState(ToastIcon.success);

  const onRadioButtonClick = (value: string): void => {
    if (value === "Success") setIcon(ToastIcon.success);
    else if (value === "Warning") setIcon(ToastIcon.warning);
    else if (value === "Info") setIcon(ToastIcon.info);
    else if (value === "Danger") setIcon(ToastIcon.error);
  };

  const onWatchAlert = (): void => {
    if (input.current?.value === EmptyString) {
      setError("Fill the input");
      return;
    }

    CreateToast(input.current?.value ?? EmptyString, icon);
    setError(EmptyString);
  };

  return (
    <>
      <h2 className="title is-2">Alert project example</h2>

      <div className="box p-5">
        <div className="columns">
          <div className="column is-two-thirds">
            <label className="label">Test Alerts</label>
            <Input
              ref={input}
              icon="user"
              placeholder="Write the message"
              name="testInput"
              error="This input can not be empty"
            />
          </div>
          <div className="column">
            <RadioButton
              data={["Success", "Warning", "Info", "Danger"]}
              onClick={onRadioButtonClick}
              name="radioButton"
              className="is-flex is-flex-direction-column"
              defaultValue="Success"
            />
          </div>
        </div>

        <ButtonIcon
          icon="user"
          onClick={onWatchAlert}
          name="button"
          className="is-success"
        >
          Submit form
        </ButtonIcon>

        <div className="has-text-danger">{error}</div>
      </div>
    </>
  );
}
